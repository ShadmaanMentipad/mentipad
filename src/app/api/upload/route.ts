import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "Image required" }, { status: 400 });
  }

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPG, PNG, WEBP allowed" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "mentors" }, (err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .end(buffer);
  });

  return NextResponse.json({
    url: result.secure_url,
    public_id: result.public_id,
  });
}
