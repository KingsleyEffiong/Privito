export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_upload"); // <-- your preset name

  const cloudName = "divmlpgye"; // from your Cloudinary dashboard

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error?.message || "Upload failed");
  }

  const data = await res.json();
  return data.secure_url; // public URL
}
