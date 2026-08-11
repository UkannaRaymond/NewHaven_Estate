import cloudiary from "../lib/cloudinary";

export type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
};

export async function uploadToCloudinary(
  file: File,
): Promise<CloudinaryUploadResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const dataURL = `data:${file.type};base64,${base64}`;

  try {
    const result = await cloudiary.uploader.upload(dataURL, {
      folder: "blog-website",
      transformation: [
        {
          width: 1200,
          crop: "limit",
          fetch_format: "auto",
          quality: "auto",
        },
      ],
    });
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image");
  }
}

export async function deleteFromCloudinary(publicId: string) {
  try {
    await cloudiary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
}
