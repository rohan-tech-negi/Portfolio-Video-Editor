"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="relative w-full bg-[#111] text-white pt-20 pb-8 px-6 md:px-12 lg:px-16 overflow-hidden min-h-[40vh] flex flex-col justify-between">
      <div className="max-w-[1500px] mx-auto w-full flex-1 z-10 relative">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          <div className="max-w-md">
            <h3 className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-4">
              Open to new opportunities
            </h3>
            <p className="text-xl md:text-2xl font-light leading-snug">
              Let&apos;s craft something beautiful together. Reach out if you have a project in mind.
            </p>
            <a 
              href="mailto:rohanwork953@gmail.com" 
              className="mt-8 inline-flex items-center gap-2 text-lg border-b border-white/30 pb-1 hover:border-white transition-colors group"
            >
              rohanwork953@gmail.com
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Socials</h4>
              <a href="#" className="text-sm font-medium hover:text-gray-300 transition-colors">Instagram</a>
              <a href="#" className="text-sm font-medium hover:text-gray-300 transition-colors">Twitter</a>
              <a href="#" className="text-sm font-medium hover:text-gray-300 transition-colors">LinkedIn</a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Internal</h4>
              <Link href="/" className="text-sm font-medium hover:text-gray-300 transition-colors">Home</Link>
              <Link href="/about" className="text-sm font-medium hover:text-gray-300 transition-colors">About</Link>
              <Link href="/work" className="text-sm font-medium hover:text-gray-300 transition-colors">Work</Link>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-[1500px] mx-auto w-full relative z-10 mt-24">
        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400 tracking-wide uppercase">
          <p>© {new Date().getFullYear()} ROHAN NEGI</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            LOCAL TIME IN NEW DELHI: {time || "—:—"}
          </div>
        </div>
      </div>
    </footer>
  );
}
