import { NextRequest, NextResponse } from "next/server";
import * as mammoth from "mammoth";
import { getTextFromPPTX } from "./getTextFromPPTX"; // Import getTextFromPPTX function
import { prisma } from "@/lib/prisma";

async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    // Get the user ID from the form data
    const userId: number | null = Number(data.get("userId"));
    const authorName: String | null = String(data.get("authorName"));


    console.log("]]]]]]]]]]]]]]]]]]]]");
    console.log(userId);
    console.log(authorName);
    console.log("]]]]]]]]]]]]]]]]]]]]");

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const bufferObj = Buffer.from(bytes);

  // Create a new file record associated with the user
    const newFile = await prisma.file.create({
      data: {
        filename: file.name,
        data: bufferObj,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    console.log(`File ${file.name} added to user ${userId}`);
    let text: string;

    if (file.name.endsWith(".docx")) {
      text = await extractTextFromDocx(bufferObj);
    } else if (file.name.endsWith(".pptx")) {
      // Handle PPTX files using getTextFromPPTX function
      text = await getTextFromPPTX(bufferObj);
    } else if (file.name.endsWith(".txt")) {
      text = bufferObj.toString("utf-8");
    } else {
      throw new Error("Unsupported file format");
    }

    console.log(
      "====================================================================="
    );
    console.log(text);
    console.log(
      "====================================================================="
    );

    return NextResponse.json({ success: true, text });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json({ success: false });
  }
}
