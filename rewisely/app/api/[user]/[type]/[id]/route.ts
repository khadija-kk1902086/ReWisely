import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(requst:Request,params:any) {

  const userId = Number(params.params.user);
  const materialId = Number(params.params.id);
  const type=params.params.type

  console.log(
    "--------------------------------------------------------------------"
  );
  console.log(params);
  console.log(userId);
  console.log(type);
  console.log(materialId);
  console.log(
    "--------------------------------------------------------------------"
  );

  try {
    const AllUserMaterial = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        files: true,
        mindmaps: true,
        flashCards: true,
        summaries: true,
        learningTechniques: true,
        questionsAnswers: true,
      },
    });


    if (type === "mindmaps") {
      const material = AllUserMaterial?.mindmaps.find(
        (mindmap) => mindmap.id == materialId
      );
      return NextResponse.json({ success: true, material });
    } else if (type === "questionsAnswers") {
      const material = AllUserMaterial?.questionsAnswers.find(
        (questionsAnswer) => questionsAnswer.id == materialId
      );
      return NextResponse.json({ success: true, material });
    } else if (type === "flashCards") {
      const material = AllUserMaterial?.flashCards.find(
        (flashCard) => flashCard.id == materialId
      );
      return NextResponse.json({ success: true, material });
    } else if (type === "summaries") {
      const material = AllUserMaterial?.summaries.find(
        (summary) => summary.id == materialId
      );
      return NextResponse.json({ success: true, material });
    } else if (type === "learningTechniques") {
      const material = AllUserMaterial?.learningTechniques.find(
        (learningTechnique) => learningTechnique.id == materialId
      );

      return NextResponse.json({ success: true, material });
    } else {
      throw new Error("Invalid pathname");
    }


  } catch (error) {
    console.error("Error fethcing material:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch material to the database",
    });
  }
}
