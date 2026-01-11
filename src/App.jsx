import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Pages
import LandingPage from './pages/LandingPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import TeacherDashboard from './pages/TeacherDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import PrimaryPage from "./pages/PrimaryPage";
import SecondaryPage from "./pages/SecondaryPage";
import HighSchoolPage from "./pages/HighSchoolPage";
import CollegePage from "./pages/CollegePage";
import Level1Page from "./pages/Level1Page";
import Level2Page from "./pages/Level2Page";
import Level3Page from "./pages/Level3Page";
import VirtualCityPage from "./pages/VirtualCityPage";
import ForumPage from "./pages/ForumPage";
import RealWorldQuestPage from "./pages/RealWorldQuestPage";
import AchievementsPage from "./pages/AchievementsPage";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/student/*" element={<StudentDashboard />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/primary" element={<PrimaryPage />} />
      <Route path="/secondary" element={<SecondaryPage />} />
      <Route path="/highschool" element={<HighSchoolPage />} />
      <Route path="/college" element={<CollegePage />} />
      <Route path="/student/primary/level1" element={<Level1Page />} />
      <Route path="/student/primary/level2" element={<Level2Page />} />
      <Route path="/student/primary/level3" element={<Level3Page />} />
      <Route path="/virtualcity" element={<VirtualCityPage />} />
      <Route path="/forum" element={<ForumPage />} />
      <Route path="/quests" element={<RealWorldQuestPage />} />
      <Route path="/achievements" element={<AchievementsPage />} />

      {/* 404 fallback */}
      <Route
        path="*"
        element={
          <div className="h-screen flex items-center justify-center text-xl">
            404: Page Not Found
          </div>
        }
      />
    </Routes>
  )
}
