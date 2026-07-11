"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const prev = () => setI((i - 1 + images.length) % images.length);
  const next = () => setI((i + 1) % images.length);

  return (
    <div>
      <div className="relative flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-8">
        <Image key={images[i]} src={images[i]} alt={`${alt} — photo ${i + 1}`} width={640} height={480} className="h-auto max-h-[400px] w-auto object-contain" priority={i === 0} />
        {images.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-slate-600 shadow-sm transition hover:text-blue-600">‹</button>
            <button onClick={next} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-slate-600 shadow-sm transition hover:text-blue-600">›</button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, j) => (
            <button key={img} onClick={() => setI(j)} aria-label={`Photo ${j + 1}`}
              className={j === i ? "relative h-16 w-16 shrink-0 rounded-lg border-2 border-blue-500 bg-white p-1" : "relative h-16 w-16 shrink-0 rounded-lg border border-slate-200 bg-white p-1 hover:border-blue-300"}>
              <Image src={img} alt="" fill className="object-contain p-1" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
