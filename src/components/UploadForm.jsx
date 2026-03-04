import React, { useState } from "react";
import api from "../api";

if (!localStorage.getItem("access")) {
  window.location.href = "/login";
  return null;
}

function UploadForm({ onUploadSuccess }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);    // must match Django model field name
    formData.append("is_public", isPublic);

    try {
      setLoading(true);

      const response = await api.post("/videos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload success:", response.data);

      alert("Video uploaded successfully!");

      // Reset form
      setTitle("");
      setFile(null);
      setIsPublic(false);

      if (onUploadSuccess) onUploadSuccess(); // refresh video list

    } catch (err) {
      console.error("Upload error:", err.response?.data || err);
      alert("Upload failed. Check backend logs and console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Upload Video</h2>

      <input
        type="text"
        placeholder="Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <br />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />

      <br />

      <label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
        />
        Public
      </label>

      <br />

      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload Video"}
      </button>
    </form>
  );
}

export default UploadForm;
