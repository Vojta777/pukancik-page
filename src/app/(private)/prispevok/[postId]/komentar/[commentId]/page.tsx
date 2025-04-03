import { useState, useEffect } from "react";

export const metadata = { title: 'Detail komentara | Insta 2.0' };

export default function CommentDetails({ params }: { params: { postId: string; commentId: string; } }) {
    const { postId, commentId } = params;
    const [comment, setComment] = useState<any>(null); // State to store the comment details
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch the comment details when the component mounts
    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await fetch(`/api/comments?commentId=${commentId}`);
                const data = await response.json();
                if (response.ok) {
                    setComment(data); // Set comment details if response is successful
                } else {
                    setError(data.message || "Failed to fetch comment.");
                }
            } catch (error) {
                setError("An error occurred while fetching the comment.");
            }
        };

        fetchComment();
    }, [commentId]);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/comments", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ commentId }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message); // Show success message
                // Optionally redirect or update UI
                window.location.href = `/prispevok/${postId}`;
            } else {
                setError(result.message || "Failed to delete comment.");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
            setError("An error occurred while deleting the comment.");
        } finally {
            setLoading(false);
        }
    };

    // Render loading, error, or comment details
    if (!comment && !error) {
        return <p>Loading comment...</p>;
    }

    return (
        <div>
            <h1>Komentar #{commentId} prispevku #{postId}</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {comment && (
                <div>
                    <p><strong>{comment.user.name}</strong>: {comment.content}</p>
                    {/* Add delete button next to the comment */}
                    <button onClick={handleDelete} disabled={loading}>
                        {loading ? "Deleting..." : "Delete Comment"}
                    </button>
                </div>
            )}
        </div>
    );
}
