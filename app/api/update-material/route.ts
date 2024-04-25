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
    // const authorName = data.authorName;
    const userId = data.userId;
      const type = data.type;
      const materialId = data.materialId;
    // const fileTitle = data.fileTitle;

    try {
      if (type === "mindmaps") {
        // Save the material and its associated choices to the database
        const updatedMaterial = await prisma.mindmap.update({
          where: { id: Number(materialId) },
          data: {
            content: JSON.stringify(choices), // Convert choices array to JSON string
            author: { connect: { id: Number(userId) } }, // Connect material to the user
          },
        });

        return NextResponse.json({ success: true, updatedMaterial });
      } else if (type === "questionsAnswers") {
        // Save the material and its associated choices to the database
        const updatedMaterial = await prisma.questionAnswer.update({
          where: { id: Number(materialId) },
          data: {
            content: JSON.stringify(choices), // Convert choices array to JSON string
            author: { connect: { id: Number(userId) } }, // Connect material to the user
          },
        });

        return NextResponse.json({ success: true, updatedMaterial });
      } else if (type === "flashCards") {
        // Save the material and its associated choices to the database
        const updatedMaterial = await prisma.flashCard.update({
          where: { id: Number(materialId) },
          data: {
            content: JSON.stringify(choices), // Convert choices array to JSON string
            author: { connect: { id: Number(userId) } }, // Connect material to the user
          },
        });

        return NextResponse.json({ success: true, updatedMaterial });
      } else if (type === "summaries") {
        // Save the material and its associated choices to the database
        const updatedMaterial = await prisma.summary.update({
          where: { id: Number(materialId) },
          data: {
            content: JSON.stringify(choices), // Convert choices array to JSON string
            author: { connect: { id: Number(userId) } }, // Connect material to the user
          },
        });

        return NextResponse.json({ success: true, updatedMaterial });
      } else if (type === "learningTechniques") {
        // Save the material and its associated choices to the database
        const updatedMaterial = await prisma.learningTechnique.update({
          where: { id: Number(materialId) },
          data: {
            content: JSON.stringify(choices), // Convert choices array to JSON string
            author: { connect: { id: Number(userId) } }, // Connect material to the user
          },
        });

        return NextResponse.json({ success: true, updatedMaterial });
      } else {
        throw new Error("Invalid pathname");
      }
    } catch (error) {
      console.error("Error updating material:", error);
      return NextResponse.json({
        success: false,
        error: "Failed to update material in the database",
      });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" });
  }
}
