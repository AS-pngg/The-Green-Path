import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PrimaryPage from "./PrimaryPage";
import SecondaryPage from "./SecondaryPage";
import HighSchoolPage from "./HighSchoolPage";
import CollegePage from "./CollegePage";
import VirtualCityPage from "./VirtualCityPage";
import ForumPage from "./ForumPage";
import RealWorldQuestPage from "./RealWorldQuestPage";
import AchievementsPage from "./AchievementsPage";
function StudentDashboard() {
  return (
    <div className="min-h-screen bg-green-100">
      {/* ✅ Navbar */}
      <nav className="bg-green-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold tracking-wider">Student Dashboard</h1>
        <ul className="flex space-x-6">
          <li><Link to="/student/home" className="hover:text-yellow-300">Home</Link></li>
          <li><Link to="/student/virtual-city" className="hover:text-yellow-300">Virtual City</Link></li>
          <li><Link to="/student/quest" className="hover:text-yellow-300">Quest</Link></li>
          <li><Link to="/student/achievement" className="hover:text-yellow-300">Achievement</Link></li>
          <li><Link to="/student/forum" className="hover:text-yellow-300">Forum</Link></li>
          <li><Link to="/student/competition" className="hover:text-yellow-300">Competition</Link></li>
        </ul>
      </nav>

      {/* ✅ Dashboard Content Area */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="virtual-city" element={<VirtualCityPage />} />
          <Route path="quest" element={<RealWorldQuestPage />} />
          <Route path="achievement" element={<AchievementsPage />} />
          <Route path="forum" element={<ForumPage />} />
          <Route path="competition" element={<h2 className="text-xl">⚔️ Competitions</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default StudentDashboard;
