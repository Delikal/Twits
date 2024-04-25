import React from "react";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";

function HomePage() {
  return (
    <div>
      <VideoPlayer videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
    </div>
  );
}

export default HomePage;
