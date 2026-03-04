import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("videos/")
      .then(res => {
        const vids = res.data
          .filter(v => v.is_public)
          .sort((a, b) => b.views - a.views)
          .slice(0, 3);

        setFeatured(vids);
      });
  }, []);

  // ✅ Upload auth check
  const handleUploadClick = () => {
    const token = localStorage.getItem("access");

    if (token) {
      navigate("/upload");
    } else {
      alert("Please login to upload videos");
      navigate("/login");
    }
  };

  return (
    <div className="bg-gradient-to-b from-black via-slate-900 to-black text-white">

      {/* HERO SECTION */}
      <section className="text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Share Your <span className="text-blue-500">Videos</span> With The World
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          Upload, watch and discover videos from creators everywhere.
          Your personal video gallery in one place.
        </p>

        <div className="flex justify-center gap-6">
          {/* ✅ Upload button now checks login */}
          <button
            onClick={handleUploadClick}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-lg font-medium"
          >
            Upload Video
          </button>

          <Link
            to="/videos"
            className="bg-gray-800 hover:bg-gray-700 px-8 py-3 rounded-xl text-lg font-medium"
          >
            Browse Videos
          </Link>
        </div>
      </section>

      {/* FEATURED VIDEOS */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          🔥 Trending Videos
        </h2>

        {featured.length === 0 ? (
          <p className="text-gray-400 text-center">
            No videos yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {featured.map(v => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        )}
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-slate-950 text-center">
        <h2 className="text-3xl font-semibold mb-12">
          Why Use Our Platform?
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">⚡ Fast Uploads</h3>
            <p className="text-gray-400">
              Upload your videos quickly and stream smoothly.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">❤️ Like & Engage</h3>
            <p className="text-gray-400">
              Interact with videos and show appreciation.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">🌍 Public or Private</h3>
            <p className="text-gray-400">
              Control who sees your content.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}