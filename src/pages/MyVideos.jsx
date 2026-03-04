import VideoList from "../components/VideoList";

export default function MyVideos() {
  return (
    <section className="py-28">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-white mb-8">
          My Videos
        </h2>

        {/* VideoList handles fetching user's videos and deletion */}
        <VideoList
          endpoint="videos/mine/" // Fetch only logged-in user's videos
          onDelete={(id) => {
            // Optional: you can handle analytics or notifications here if needed
            console.log(`Video deleted: ${id}`);
          }}
        />
      </div>
    </section>
  );
}