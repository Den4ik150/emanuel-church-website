import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export async function uploadToCloudinary(
  file: Buffer,
  options: { folder?: string; public_id?: string } = {}
): Promise<{ url: string; thumbnailUrl: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: options.folder ?? "emmanuil-church/gallery",
          public_id: options.public_id,
          resource_type: "auto",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error || !result) return reject(error ?? new Error("Upload failed"));
          resolve({
            url: result.secure_url,
            thumbnailUrl: cloudinary.url(result.public_id, {
              width: 400,
              height: 300,
              crop: "fill",
              quality: "auto",
              fetch_format: "auto",
              secure: true,
            }),
            publicId: result.public_id,
          });
        }
      )
      .end(file);
  });
}

export function deleteFromCloudinary(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}
