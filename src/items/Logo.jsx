import React from 'react'

const Logo = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="group cursor-pointer">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]"
        >
          {/* Top petal */}
          <path
            d="M60 20 C45 20, 35 35, 35 50 C35 55, 40 60, 60 60 C80 60, 85 55, 85 50 C85 35, 75 20, 60 20Z"
            fill="#22c55e"
            className="opacity-90"
          />
          
          {/* Right petal */}
          <path
            d="M100 60 C100 45, 85 35, 70 35 C65 35, 60 40, 60 60 C60 80, 65 85, 70 85 C85 85, 100 75, 100 60Z"
            fill="#16a34a"
            className="opacity-90"
          />
          
          {/* Bottom petal */}
          <path
            d="M60 100 C75 100, 85 85, 85 70 C85 65, 80 60, 60 60 C40 60, 35 65, 35 70 C35 85, 45 100, 60 100Z"
            fill="#15803d"
            className="opacity-90"
          />
          
          {/* Left petal */}
          <path
            d="M20 60 C20 75, 35 85, 50 85 C55 85, 60 80, 60 60 C60 40, 55 35, 50 35 C35 35, 20 45, 20 60Z"
            fill="#166534"
            className="opacity-90"
          />
          
          {/* Center circle */}
          <circle cx="60" cy="60" r="8" fill="#dcfce7" />
        </svg>
      </div>
    </div>
  )
}

export default Logo