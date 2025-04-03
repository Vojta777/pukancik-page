//src/app/api/comments/route.ts
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const { postId, userId, content } = await req.json();
  
      // Validate that all required data is present
      if (!postId || !userId || !content.trim()) {
        return NextResponse.json({ message: "Invalid data." }, { status: 400 });
      }
  
      // Create a new comment in the database
      const newComment = await prisma.comment.create({
        data: {
          postId,
          userId,
          content,
        },
        include: {
          user: { select: { name: true, image: true } }, // Include user details
        },
      });
  
      return NextResponse.json(newComment); // Respond with the created comment
    } catch (error) {
      console.error("Error creating comment:", error);
      return NextResponse.json(
        { message: "An error occurred while adding the comment." },
        { status: 500 }
      );
    }
  }

  export async function GET(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const postId = searchParams.get("postId");
  
      // Validate that postId is provided
      if (!postId) {
        return NextResponse.json({ message: "Post ID is required." }, { status: 400 });
      }
  
      // Fetch comments for the specific post
      const comments = await prisma.comment.findMany({
        where: { postId },
        include: {
          user: { select: { name: true, image: true } },
        },
        orderBy: { createdAt: "asc" },
      });
  
      return NextResponse.json(comments); // Respond with the list of comments
    } catch (error) {
      console.error("Error fetching comments:", error);
      return NextResponse.json(
        { message: "An error occurred while fetching comments." },
        { status: 500 }
      );
    }
  }
  
  export async function DELETE(req: NextRequest) {
    try {
        const { commentId } = await req.json();

        // Validate that the commentId is provided
        if (!commentId) {
            return NextResponse.json({ message: "Comment ID is required." }, { status: 400 });
        }

        // Find and delete the comment from the database
        const deletedComment = await prisma.comment.delete({
            where: { id: commentId },
        });

        return NextResponse.json({ message: "Comment deleted successfully.", id: deletedComment.id }); // Respond with a success message and the deleted comment ID
    } catch (error) {
        console.error("Error deleting comment:", error);
        return NextResponse.json(
            { message: "An error occurred while deleting the comment." },
            { status: 500 }
        );
    }
}