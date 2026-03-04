import { useState, useRef } from "react";
import api from "../api";

const API_BASE = "http://127.0.0.1:8000";

export default function VideoCard({ video, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [likes, setLikes] = useState(video.likes_count || 0);
  const [liking, setLiking] = useState(false);
  const [viewCounted, setViewCounted] = useState(false);
  const videoRef = useRef(null);

  // ✅ Safe video URL
  const videoURL = video.file.startsWith("http")
    ? video.file
    : video.file.startsWith("/")
      ? `${API_BASE}${video.file}`
      : `${API_BASE}/${video.file}`;

  // COUNT VIEW ON PLAY
  const handleVideoPlay = async () => {
    if (viewCounted) return;

    try {
      await api.post(`videos/${video.id}/view/`);
      setViewCounted(true);
    } catch (err) {
      console.error("Failed to count view:", err);
    }
  };

  // DELETE VIDEO
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`videos/${video.id}/`);
      if (onDelete) onDelete(video.id);
    } catch (error) {
      console.error("Failed to delete video:", error);
      alert("Failed to delete video.");
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  // LIKE / UNLIKE
  const handleLike = async () => {
    if (liking) return;

    setLiking(true);
    try {
      const res = await api.post(`videos/${video.id}/like/`);

      if (res.data.liked) {
        setLikes(prev => prev + 1);
      } else {
        setLikes(prev => Math.max(prev - 1, 0));
      }
    } catch (err) {
      console.error("Like failed", err);
    } finally {
      setLiking(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg relative">
      
      {/* VIDEO */}
      <video
        ref={videoRef}
        controls
        className="w-full rounded-lg"
        src={videoURL}
        onPlay={handleVideoPlay} // ✅ increment view on play
      />

      {/* INFO */}
      <div className="p-5 flex justify-between items-center">
        <div>
          <h3 className="text-white font-medium text-lg">
            {video.title}
          </h3>

          <p className="text-gray-400 text-sm">
            {video.is_public ? "Public" : "Private"}
          </p>

          {/* Likes + Views */}
          <div className="flex gap-4 mt-2 text-gray-300">
            <button
              onClick={handleLike}
              disabled={liking}
              className="hover:text-blue-400"
            >
              👍 {likes}
            </button>

            <p> {video.views + (viewCounted ? 1 : 0)} views</p>
          </div>
        </div>

        {/* DELETE BUTTON */}
        {onDelete && (
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg w-80 text-white">
            <p className="mb-4">
              Are you sure you want to delete this video?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Yes
              </button>

              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}