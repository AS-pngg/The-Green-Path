import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">🎓 Choose Your Level</h1>

      <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Primary */}
        <Link
          to="/primary"
          className="bg-green-200 hover:bg-green-300 rounded-xl p-6 shadow-md cursor-pointer"
        >
          <h2 className="text-xl font-bold">🌱 Primary</h2>
          <p>Ages 8–11</p>
        </Link>

        {/* Secondary */}
        <Link
          to="/secondary"
          className="bg-blue-200 hover:bg-blue-300 rounded-xl p-6 shadow-md cursor-pointer"
        >
          <h2 className="text-xl font-bold">📘 Secondary</h2>
          <p>Ages 12–14</p>
        </Link>

        {/* High School */}
        <Link
          to="/highschool"
          className="bg-yellow-200 hover:bg-yellow-300 rounded-xl p-6 shadow-md cursor-pointer"
        >
          <h2 className="text-xl font-bold">🏫 High School</h2>
          <p>Ages 15–18</p>
        </Link>

        {/* College */}
        <Link
          to="/college"
          className="bg-purple-200 hover:bg-purple-300 rounded-xl p-6 shadow-md cursor-pointer"
        >
          <h2 className="text-xl font-bold">🎓 College</h2>
          <p>Ages 19–22</p>
        </Link>
      </div>
    </div>
  );
}
