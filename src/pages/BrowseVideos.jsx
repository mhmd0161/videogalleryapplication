import React from "react";
import VideoList from "../components/VideoList";

export default function BrowseVideos() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-semibold text-white mb-10">
          Browse Public Videos
        </h2>

        <VideoList />
      </div>
    </section>
  );
}