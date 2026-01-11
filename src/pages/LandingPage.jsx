import React from 'react'
import { useNavigate } from 'react-router-dom'
import landingBg from '../assets/landing-bg.png';

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        backgroundImage: `url(${landingBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
      className="flex flex-col items-center justify-center text-center font-mono"
    >
      <nav className="absolute top-4 flex space-x-6 text-lg">
        <button>Home</button>
        <button>About</button>
        <button>Contact</button>
      </nav>

      <h1 className="text-4xl md:text-6xl font-bold animate-bounce">
        THE GREEN PATH
      </h1>
      <p className="mt-4 text-lg md:text-2xl">Let the journey begin</p>

      <button
        onClick={() => navigate('/auth')}
        className="mt-8 px-6 py-3 bg-green-600 hover:bg-green-800 rounded-xl shadow-lg"
      >
        Start
      </button>
    </div>
  )
}

