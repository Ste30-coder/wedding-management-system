import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import GuestManagementPage from './pages/GuestManagementPage';
import RSVPPage from './pages/RSVPPage';
import CampaignsPage from './pages/CampaignsPage';
import RSVPsDashboardPage from './pages/RSVPsDashboardPage';
import RemindersPage from './pages/RemindersPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/guests" element={<GuestManagementPage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/rsvps" element={<RSVPsDashboardPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/rsvp/:id" element={<RSVPPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
