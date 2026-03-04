import { useState } from "react";
import api from "../api";

export default function UploadVideo() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("is_public", isPublic);

    try {
      await api.post("videos/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Video uploaded successfully!");
      setTitle("");
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage("Upload failed.");
    }
  };

  return (
    <section className="py-28">
      <div className="container max-w-xl">
        <h2 className="text-4xl font-semibold text-white mb-8">
          Upload Video
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 p-8 rounded-2xl space-y-6"
        >
          <input
            type="text"
            placeholder="Video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded bg-slate-800 text-white"
            required
          />

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-gray-300"
            required
          />

          <label className="flex items-center gap-3 text-gray-300">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            Public video
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg"
          >
            Upload
          </button>

          {message && (
            <p className="text-center text-gray-400">{message}</p>
          )}
        </form>
      </div>
    </section>
  );
}