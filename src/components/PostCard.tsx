// src/components/PostCard.tsx

"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import {
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import { Post } from "@/types/post";
import Caption from "./post/Caption";
import Carousel from "./post/Carousel";
import LikeButton from "./post/LikeButton";
import Timestamp from "./post/Timestamp";

export default function PostCard({ post }: { post: Post }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");

  async function handleCommentSubmit(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
  
      if (!newComment.trim()) return;
  
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post.id, userId, content: newComment }),
      });
  
      if (res.ok) {
        const addedComment = await res.json();
        setComments((prevComments) => [...prevComments, addedComment]);
        setNewComment("");
      }
    }
  }
  

  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 2,
        boxShadow: 3,
        "&:hover": { boxShadow: 6 },
        maxWidth: 500,
        margin: "25px auto",
      }}>
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <Avatar
          alt={post.user.name || "User"}
          src={post.user.image || ""}
          sx={{ mr: 2, width: 40, height: 40 }}
        />
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {post.user.name}
        </Typography>
      </Box>

      <Carousel images={post.images} />

      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Box>
            <LikeButton
              postId={post.id}
              isLiked={post.likes.some((like) => like.userId === userId)}
              initialLikes={post.likes.length}
            />
            <IconButton>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Box>
          <IconButton>
            <BookmarkBorderIcon />
          </IconButton>
        </Box>

        <Caption username={post.user.name || "Unknown user"} caption={post.caption || "Bez popisu"} />
        <Timestamp date={post.createdAt} />

        {/* 📝 Comment Input Field */}
        {userId && (
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleCommentSubmit}
            sx={{ mt: 2 }}
          />
        )}

        {/* 💬 Display Comments */}
        <Box sx={{ mt: 2 }}>
          {comments.map((comment) => (
            <Box key={comment.id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar alt={comment.user.name || "User"} src={comment.user.image || ""} sx={{ mr: 2, width: 30, height: 30 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {comment.user.name}
                </Typography>
                <Typography variant="body2">{comment.content}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
