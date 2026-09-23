// Génère favicons, icônes PWA, logo Schema.org et image Open Graph à partir des assets du client.
// Usage : pnpm icons
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";

const LOGO = "src/assets/logo-ragot.png";
const OG_PHOTO = "src/assets/photos/photo-hero.jpg";
const OUT = "public";
const NAVY = { r: 15, g: 15, b: 82, alpha: 1 };
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

await mkdir(OUT, { recursive: true });

/** Logo centré sur un carré blanc avec marge. */
async function squareIcon(size, padding = 0.12) {
  const inner = Math.round(size * (1 - padding * 2));
  const logo = await sharp(LOGO).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: logo, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const ico48 = await squareIcon(48, 0.04);
const ico32 = await squareIcon(32, 0.03);
// Conteneur ICO minimal avec images PNG embarquées.
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, buf }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.buf)]);
}
await writeFile(`${OUT}/favicon.ico`, ico([{ size: 48, buf: ico48 }, { size: 32, buf: ico32 }]));
await writeFile(`${OUT}/apple-touch-icon.png`, await squareIcon(180));
await writeFile(`${OUT}/icon-192.png`, await squareIcon(192));
await writeFile(`${OUT}/icon-512.png`, await squareIcon(512));

// Logo pour Schema.org (fond transparent conservé).
await sharp(LOGO).resize({ width: 600 }).png({ compressionLevel: 9, palette: true }).toFile(`${OUT}/logo-ragot.png`);

// Image Open Graph 1200×630 : photo avant/après entière (non recadrée) sur fond marine.
const photo = await sharp(OG_PHOTO).rotate().resize(1200, 630, { fit: "contain", background: NAVY }).toBuffer();
await sharp(photo).jpeg({ quality: 82, mozjpeg: true }).toFile(`${OUT}/og-image.jpg`);

await writeFile(
  `${OUT}/site.webmanifest`,
  JSON.stringify(
    {
      name: "RAGOT Couvreur Pro",
      short_name: "RAGOT",
      lang: "fr",
      start_url: "/",
      display: "browser",
      background_color: "#F7F6F3",
      theme_color: "#0F0F52",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2,
  ) + "\n",
);

console.log("Icônes, logo et image Open Graph générés dans public/");
