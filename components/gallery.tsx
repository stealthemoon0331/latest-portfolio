"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DomeGallery from "./ui/dome-gallery";

const storyPages = [
  {
    title: "The Beginning",
    content: "My journey started as a curious kid fascinated by how things worked. While others dismantled toys, I explored my family's old computer, clicking through menus I didn't understand. The first time I fixed a typo in code and saw it run, I was hooked—that spark ignited a lifelong passion.",
    image: "/gallery/4.jpg",
  },
  {
    title: "University & Foundation",
    content: "I immersed myself in mathematics, computer science, and problem-solving at university. At Toyota Tsusho, I transformed academic knowledge into real-world solutions, developing large-scale logistics applications and learning the importance of clean, maintainable code in agile environments.",
    image: "/gallery/20.jpg",
  },
  {
    title: "Leadership & Innovation",
    content: "Joining JSOL Corporation marked a turning point. I took on leadership responsibilities—designing scalable architectures, integrating blockchain systems, and deploying AI-powered features. These experiences honed my ability to connect technical innovation with tangible business value.",
    image: "/gallery/14.jpg",
  },
  {
    title: "Lessons & Growth",
    content: "My strengths lie in rapid prototyping and turning complex ideas into practical systems. Early on, I over-engineered solutions in pursuit of perfection, often slowing delivery. I learned to focus on what matters: delivering functional results quickly, then refining through iteration.",
    image: "/gallery/15.jpg",
  },
];

export const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % storyPages.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <section id="gallery" className="py-20">
      <h1 className="heading">
        <span className="text-purple">My Life</span>
      </h1>

      <div className="mx-auto mt-8 grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div className="h-[70vh] rounded-3xl border border-white/10 bg-black/10 p-2">
          <DomeGallery />
        </div>

        {/* Story */}
        <aside className="flex h-full flex-col rounded-3xl border border-white/10 bg-black/10 p-6 lg:p-8">
          <h2 className="mb-4 text-xl font-semibold text-white/90 md:text-2xl">My Story</h2>
          
          {/* Story Content */}
          <div className="mb-4 flex-1 text-white/80">
            <h3 className="mb-3 text-lg font-medium text-purple md:text-xl">
              {storyPages[currentPage].title}
            </h3>
            <p className="mb-4 leading-relaxed">{storyPages[currentPage].content}</p>
            
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden rounded-lg md:h-64">
              <Image
                src={storyPages[currentPage].image}
                alt={storyPages[currentPage].title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5"
              aria-label={isAutoPlay ? "Pause" : "Play"}
            >
              {isAutoPlay ? "⏸" : "▶"}
            </button>

            <div className="flex gap-1">
              {storyPages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentPage
                      ? "w-6 bg-purple"
                      : "w-2 bg-white/20 hover:bg-white/30"
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(storyPages.length - 1, prev + 1))}
              disabled={currentPage === storyPages.length - 1}
              className="rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
};


