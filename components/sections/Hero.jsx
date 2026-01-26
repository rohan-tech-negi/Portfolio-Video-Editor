import { FaInstagram } from "react-icons/fa";
import { FaBehance } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Antigravity from "../Antigravity";
export default function Hero() {
  return (
     <section className="relative w-full min-h-screen  overflow-hidden">

      {/* 🔵 Antigravity Background */}
      <div className="absolute inset-0 z-0">
        <Antigravity
          count={600}
          magnetRadius={10}
          ringRadius={10}
          waveSpeed={0.6}
          waveAmplitude={2}
          particleSize={1.8}
          lerpSpeed={0.10}
          color="#29ffad"
          autoAnimate
          particleVariance={2}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="sphere"
          fieldStrength={10}
        />
      </div>

      {/* 🔴 Hero Content */}
      <div className="relative z-10 flex justify-center w-full pt-48 pointer-events-none">
        <div className="flex items-start gap-40">

          {/* LEFT GROUP */}
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-black h-32 w-32"></div>
            <h5 className="text-xl opacity-50">
              Video Editor, Cinematographer
              <div className="flex gap-4 pt-2 cursor-pointer">
                <FaBehance />
                <FaInstagram />
              </div>
            </h5>
          </div>

          {/* RIGHT GROUP */}
          <div className="flex flex-col items-start gap-6">

            {/* Hi! I'm Rohan */}
            <div className="flex items-center gap-4">
              <h1 className="text-8xl">Hi! I'm</h1>
              <div className="rounded-full bg-white h-20 w-40 px-6 drop-shadow-lg flex items-center justify-center">
                <span className="text-black text-4xl">Rohan</span>
              </div>
            </div>

            {/* a Video Editor */}
            <div className="flex gap-4 items-center">
              <h1 className="text-8xl">a</h1>
              <div className="rounded-full bg-white h-20 px-8 drop-shadow-lg flex items-center justify-center">
                <span className="text-black text-4xl">Video Editor</span>
              </div>
            </div>

            {/* Text + Button */}
            <div className="max-w-md pt-4">
              <h3 className="text-lg leading-relaxed opacity-80">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse!
              </h3>

              <button
  className="pointer-events-auto relative mt-6 flex items-center justify-between gap-4 px-6 py-3 rounded-full text-white text-sm font-medium overflow-hidden group bg-black"
>
  {/* Green hover fill */}
  <span className="absolute inset-0 bg-emerald-500 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>

  <span className="relative z-10 text-xl">
    See My Work
  </span>

  <div className="relative z-10 bg-white rounded-full w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-2">
    <FaArrowRight className="text-black text-sm" />
  </div>
</button>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
