import { FaInstagram } from "react-icons/fa";
import { FaBehance } from "react-icons/fa";

export default function Hero(){
    return (
        <>

            <div>
                {/* upper side  */}
                    <div className="flex justify-center w-full pt-32">
  {/* Main container for LEFT + RIGHT */}
  <div className="flex items-center gap-40">

    {/* LEFT GROUP (unchanged) */}
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

    {/* RIGHT GROUP — only added one new div below */}
    <div className="flex flex-col items-center gap-4">
      {/* Original line: Hi! I'm + Rohan */}
      <div className="flex items-center gap-4">
        <h1 className="text-8xl">Hi! I'm</h1>
        <div className="rounded-full bg-white h-20 w-40 px-6 drop-shadow-lg flex items-center justify-center">
          <span className="text-black text-4xl">Rohan</span>
        </div>
      </div>

      {/* ✅ NEW: "a video editor" in an oval badge BELOW */}
      <div className="flex gap-4 items-center pr-20">
        <h1 className="text-8xl">a</h1>
      <div className="rounded-full bg-white h-20 w-70 px-6 drop-shadow-lg flex items-center justify-center">
        
        <span className="text-black text-4xl"> Video Editor</span>
      </div>
      </div>
      
    </div>

  </div>
</div>

                {/* lower side */}
                <div>
                    {/* left */}
                    <div>

                    </div>
                    {/* right */}
                    <div>
                        <div>
        <span className="text-black text-4xl">lorem</span>
    </div>
                    </div>
                </div>
            </div>
    
     
        </>
    )
}