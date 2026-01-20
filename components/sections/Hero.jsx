import { FaInstagram } from "react-icons/fa";
import { FaBehance } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <div>
      {/* Upper section */}
      <div className="flex justify-center w-full pt-28">
        {/* Main container */}
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

            {/* ✅ TEXT + BUTTON NOW PROPERLY PLACED */}
            <div className="max-w-md pt-4">
              <h3 className="text-lg leading-relaxed opacity-80">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse!
              </h3>
              <button className="relative mt-6 flex items-center justify-between gap-18 px-6 py-3 rounded-full text-white text-sm font-medium overflow-hidden group bg-black">

  {/* Green hover fill (left → right) */}
  <span className="absolute inset-0 bg-emerald-500 transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>

  {/* Content */}
  <span className="relative z-10 text-xl">
    See My Work
  </span>

  {/* Arrow circle */}
  <div className="relative z-10 bg-white rounded-full w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-2">
    <FaArrowRight className="text-black text-sm" />
  </div>

</button>
             
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
