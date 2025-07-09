import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './utils/utils';
import Dashboard from './pages/Dashboard';
import AllUsers from './pages/User/AllUsers';
import Rules from './pages/Rules';
import TransactionList from './pages/Transaction List';
import PrivacyPolicy from './pages/Privacy Policy';
import TermsandConditions from './pages/Terms and Conditions';
import CoinSystem from './pages/Coin System';
import HowToPlay from './pages/How To Play';
import ResponsibleGaming from './pages/Responsible Gaming';
import PoweredByCompany from './pages/Powered By Company';
import HelpAndSupport from './pages/Help And Support';
import Rtp from './pages/Rtp';
import ContactDetails from './pages/Contact Details';
import GameLogs from './pages/Game Logs';
import HomePage from './pages/Website Management/Home Page';
import UserDetails from './pages/User/UserDetails';
import DeveloperPage from './pages/Website Management/Developer Page';
import JobPage from './pages/Website Management/Jobs Page';
import LegalPage from './pages/Website Management/Legal page';
import GamePage from './pages/Website Management/Game Page';

const Login = lazy(() => import('./pages/Login'));


const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-primary">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-primary font-inter">Loading...</p>
    </div>
  </div>
);


export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/users/details/:id" element={<UserDetails />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/transaction-list" element={<TransactionList />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsandConditions />} />
          <Route path="/coin-system" element={<CoinSystem />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/responsible-gaming" element={<ResponsibleGaming />} />
          <Route path="/powered-by-company" element={<PoweredByCompany />} />
          <Route path="/help-and-support" element={<HelpAndSupport />} />
          <Route path="/rtp" element={<Rtp />} />
          <Route path="/contact-details" element={<ContactDetails />} />
          <Route path="/game-logs" element={<GameLogs />} />
          <Route path="/website/home-page" element={<HomePage />} />
          <Route path="/website/developer-page" element={<DeveloperPage />} />
          <Route path="/website/jobs-page" element={<JobPage />} />
          <Route path="/website/legal-page" element={<LegalPage />} />
          <Route path="/website/game-page" element={<GamePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}