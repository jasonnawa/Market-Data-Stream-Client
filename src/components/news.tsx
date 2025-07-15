"use client";
import { useEffect, useState } from "react";

interface Video {
  id: string;
  title: string;
  channel: string;
}

const dummyVideos: Video[] = [
  { id: "5Zg-C8AAIGg", title: "Why Stocks Are Rallying", channel: "CNBC" },
  { id: "uMvtG5M9xL0", title: "Bloomberg business week", channel: "Bloomberg" },
  { id: 'ifKNvOCpEF4', title: "Inflation Rises", channel: "Yahoo Finance" }
];

export default function News() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const random = dummyVideos[Math.floor(Math.random() * dummyVideos.length)];
    setSelectedVideo(random);
  }, []);

  return (
    <div className="w-full h-full rounded-md  flex flex-col justify-between">
      {selectedVideo ? (
        <>
          <iframe
            className="rounded w-full flex-1 mb-3"
            src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&mute=1`}
            title={selectedVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="text-sm text-indigo-900 font-medium">{selectedVideo.title}</div>
          <div className="text-xs text-gray-600">{selectedVideo.channel}</div>
        </>
      ) : (
        <p className="text-sm text-gray-600 italic">Loading video...</p>
      )}
    </div>
  );
}
