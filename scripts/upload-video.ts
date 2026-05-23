import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

async function main() {
  const filePath = "/Users/mac/Downloads/Благодаря ССХ, Нортеку и его партнерам, в этот вторник в Бельцах пройдет воркшоп с двумя опытным.mp4";

  console.log("Uploading video...");
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "video",
    folder: "emmanuil-church/news/ru",
    public_id: "workshop-nortek-2025",
    overwrite: true,
  });
  console.log("✓ Video URL:", result.secure_url);
  console.log("  Thumbnail:", result.secure_url.replace("/video/upload/", "/video/upload/so_0/").replace(".mp4", ".jpg"));
}

main().catch((e) => { console.error(e); process.exit(1); });
