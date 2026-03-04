import { useEffect, useState } from "react";
import api from "../api";
import VideoCard from "./VideoCard";

export default function VideoList({ endpoint = "videos/", onDelete: parentOnDelete }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(endpoint)
      .then(res => {
        // For public videos, filter only public ones
        let fetchedVideos = res.data;
        if (endpoint === "videos/") {
          fetchedVideos = fetchedVideos.filter(v => v.is_public);
        }
        setVideos(fetchedVideos);
      })
      .catch(err => {
        console.error("Error fetching videos:", err);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  const handleDelete = (id) => {
    // Remove deleted video from state
    setVideos(prev => prev.filter(v => v.id !== id));

    // Notify parent if needed
    if (parentOnDelete) parentOnDelete(id);
  };

  if (loading) {
    return <p className="text-gray-400">Loading videos...</p>;
  }

  if (videos.length === 0) {
    return <p className="text-gray-400">No videos available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {videos.map(video => (
        <VideoCard 
          key={video.id} 
          video={video} 
          onDelete={endpoint === "videos/mine/" ? handleDelete : undefined} 
        />
      ))}
    </div>
  );
}