// pages/api/save-material.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    console.log("+_+____________________+++++++++++");
    const data = await req.json();
    console.log(data);
    console.log("+_+____________________+++++++++++");

    const choices = data.choices;
    const authorName = data.authorName;
    const userId = data.userId;
    const pathname = data.pathname;
    const fileTitle = data.fileTitle;

    try {
      if (pathname === "/mind-map") {
        // Save the material and its associated choices to the database
        const savedMaterial = await prisma.mindmap.create({
          data: {
            title: fileTitle,
            content: JSON.stringify(choices), // Convert choices array to JSON string
            author: { connect: { id: Number(userId) } }, // Connect material to the user
          },
        });

        return NextResponse.json({ success: true, savedMaterial });
      } else if (pathname === "/questions-answers") {
        // Save the material and its associated choices to the database
        const savedMaterial = await prisma.questionAnswer.create({
          data: {
            title: fileTitle,
            content: JSON.stringify(choices), // Convert choices array to JSON string
            author: { connect: { id: Number(userId) } }, // Connect material to the user
          },
        });

        return NextResponse.json({ success: true, savedMaterial });
      } else if (pathname === "/flash-cards") {
        // Save the material and its associated choices to the database
        const savedMaterial = await prisma.flashCard.create({
          data: {
            title: fileTitle,
            content: JSON.stringify(choices), // Convert choices array to JSON string
            author: { connect: { id: Number(userId) } }, // Connect material to the user
          },
        });

        return NextResponse.json({ success: true, savedMaterial });
      } else if (pathname === "/text-summary") {
        // Save the material and its associated choices to the database
        const savedMaterial = await prisma.summary.create({
          data: {
            title: fileTitle,
            content: JSON.stringify(choices), // Convert choices array to JSON string
            author: { connect: { id: Number(userId) } }, // Connect material to the user
          },
        });

        return NextResponse.json({ success: true, savedMaterial });
      } else if (pathname === "/learning-technique") {
        // Save the material and its associated choices to the database
        const savedMaterial = await prisma.learningTechnique.create({
          data: {
            title: fileTitle,
            content: JSON.stringify(choices), // Convert choices array to JSON string
            author: { connect: { id: Number(userId) } }, // Connect material to the user
          },
        });

        return NextResponse.json({ success: true, savedMaterial });
      } else {
        throw new Error("Invalid pathname");
      }
    } catch (error) {
      console.error("Error saving material:", error);
      return NextResponse.json({
        success: false,
        error: "Failed to save material to the database",
      });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" });
  }
}
