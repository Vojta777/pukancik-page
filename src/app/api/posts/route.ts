import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const caption = formData.get("caption") as string;
    const userId = formData.get("userId") as string;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required." },
        { status: 400 }
      );
    }

    // Vytvorenie príspevku s prázdnym `tags`, bez likes/comments atď.
    const newPost = await prisma.post.create({
      data: {
        userId,
        caption: caption || "",
        tags: [], // predvolené prázdne pole
      },
    });
    

    const files = formData.getAll("images") as File[];
    const imageRecords = [];

    for (let i = 0; i < files.length; i++) {
      const image = files[i];

      const fileBuffer = image.stream(); // Získame stream obrázka
      const { url } = await put(image.name, fileBuffer, { access: "public" });


      const postImage = await prisma.postImage.create({
        data: {
          postId: newPost.id,
          imageUrl: url, 
          order: i, 
        },
      });
      imageRecords.push(postImage);
    }
    

    console.log("New Post Created: ", newPost);
    console.log("Images associated with the post: ", imageRecords);

    return NextResponse.json({ post: newPost, images: imageRecords });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the post." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ message: "Post ID is required." }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: { select: { name: true, image: true } },
        images: true,
        likes: true,
        comments: {
          include: {
            user: { select: { name: true, image: true } },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the post." },
      { status: 500 }
    );
  }
}
