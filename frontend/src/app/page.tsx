"use client";

import Image from "next/image";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <BackgroundRippleEffect />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

       
          <div className="-ml-10 md:-ml-20">
  <h1 className="font-bold text-6xl mb-12 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
    AI CODE REVIEW
  </h1>

  <p className="text-white/80 text-lg leading-relaxed max-w-md">
    AI Code Review helps developers write cleaner, safer, and more
    efficient software by automatically analyzing source code. It
    detects bugs, security vulnerabilities, and performance issues
    early, providing instant and actionable feedback to improve code
    quality.
  </p>
</div>


        
          <div className="flex justify-center md:justify-end">
            <Image
              src="/Image/dev.jpeg"
              alt="AI Code Review Illustration"
              width={420}
              height={420}
              className="rounded-xl opacity-90"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
