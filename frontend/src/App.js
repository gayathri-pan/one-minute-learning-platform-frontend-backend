import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import OngoingCourses from './components/OngoingCourses';
import CompletedCourses from './components/CompletedCourses';
import AddContent from './components/AddContent';
import Profile from './components/Profile';
import QuizPage from './components/QuizPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/NavBar" element={<Navbar />} />
          <Route path="/ongoing" element={<OngoingCourses />} />
          <Route path="/completed" element={<CompletedCourses />} />
          <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminPage /></ProtectedRoute>} />
          <Route path="/AddContent" element={<ProtectedRoute requireAdmin={true}><AddContent /></ProtectedRoute>} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/quiz/:id" element={<QuizPage />} />

          {/* 🔚 Wildcard route always last */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
