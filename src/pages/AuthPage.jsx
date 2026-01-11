import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import landingBg from '../assets/landing-bg.png';

export default function AuthPage() {
  const [role, setRole] = useState('student')
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (role === 'student') navigate('/student')
    if (role === 'teacher') navigate('/teacher')
    if (role === 'admin') navigate('/admin')
  }

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
              backgroundImage: `url(${landingBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100vh',
            }}
    >
      {/* overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-96 z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Full name (signup only) */}
          {!isLogin && (
            <label className="block mb-4">
              <span className="text-gray-700">Full Name</span>
              <input
                type="text"
                className="mt-2 w-full border p-2 rounded"
                required
              />
            </label>
          )}

          {/* Email */}
          <label className="block mb-4">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              className="mt-2 w-full border p-2 rounded"
              required
            />
          </label>

          {/* Password */}
          <label className="block mb-4">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              className="mt-2 w-full border p-2 rounded"
              required
            />
          </label>

          {/* Confirm Password (signup only) */}
          {!isLogin && (
            <label className="block mb-4">
              <span className="text-gray-700">Confirm Password</span>
              <input
                type="password"
                className="mt-2 w-full border p-2 rounded"
                required
              />
            </label>
          )}

          {/* Role selection */}
          <label className="block mb-4">
            <span className="text-gray-700">Choose Role</span>
            <select
              className="mt-2 w-full border p-2 rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* toggle link */}
        <p
          className="mt-4 text-center text-blue-600 cursor-pointer hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  )
}
