import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request) {
  const { type, id } = await request.json();


  console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]")
  console.log(type)
  console.log(id)
  console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]")
  try {
    switch (type) {
      case "files":
        await prisma.file.delete({ where: { id } });
        console.log(`File with ID ${id} deleted successfully`);
        return NextResponse.json({ success: true });
      case "mindmaps":
        await prisma.mindmap.delete({ where: { id } });
        console.log(`Mindmap with ID ${id} deleted successfully.`);
        return NextResponse.json({ success: true });
      case "flashCards":
        await prisma.flashCard.delete({ where: { id } });
        console.log(`FlashCard with ID ${id} deleted successfully.`);
        return NextResponse.json({ success: true });
      case "summaries":
        await prisma.summary.delete({ where: { id } });
        console.log(`Summary with ID ${id} deleted successfully.`);
        return NextResponse.json({ success: true });
      case "learningTechniques":
        await prisma.learningTechnique.delete({ where: { id } });
        console.log(`LearningTechnique with ID ${id} deleted successfully.`);
        return NextResponse.json({ success: true });
      case "questionsAnswers":
        await prisma.questionAnswer.delete({ where: { id } });
        console.log(`QuestionAnswer with ID ${id} deleted successfully.`);
        return NextResponse.json({ success: true }); default:
        console.error(`Invalid type: ${type}`);
        return NextResponse.error(`Invalid type: ${type}`, { status: 400 });

    }
  } catch (error) {
    console.error(`Error deleting ${type} with ID ${id}:`, error);
    return NextResponse.error(`Error deleting ${type} with ID ${id}: ${error}`, { status: 500 });

  }
}
