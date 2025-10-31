"use client";

import DomeGallery from "./ui/dome-gallery";

export const Gallery = () => {
  return (
    <section id="gallery" className="py-20">
      <h1 className="heading">
        <span className="text-purple">Gallery</span>
      </h1>

      <div className="mt-8 w-full">
        <div className="mx-auto h-[70vh] w-full max-w-7xl rounded-3xl border border-white/10 bg-black/10 p-2">
          <DomeGallery />
        </div>
      </div>
    </section>
  );
};


