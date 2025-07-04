import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './utils/utils';
import Dashboard from './pages/Dashboard';
import AllUsers from './pages/User/AllUsers';
import AdviserList from './pages/Adviser/AdviserList';
import PendingRequest from './pages/Adviser/PendingRequest';
import SuspendedList from './pages/Adviser/SuspendedList';
import Appointment from './pages/Appointment/Appointment';
import UserDetails from './pages/User/UserDetails';
import AdviserDetails from './pages/Adviser/AdviserDetails';
import PendingAdviserDetails from './pages/Adviser/PendingAdviserDetails';
import SuspendedAdviserDetails from './pages/Adviser/SuspendedAdviserDetails';
import CompletedCall from './pages/Completed';
import Earning from './pages/Earning';
import Blog from './pages/Blog';
import Category from './pages/Category';
import Skill from './pages/Category/Skill';
import Teamlist from './pages/Team Management/Teamlist';
import TeamRole from './pages/Team Management/TeamRole';
import BannerManagement from './pages/Banner Management';
import WithdrawalMethod from './pages/Withdrawal/WithdrawalMethod';
import WalletHistory from './pages/Withdrawal/WalletHistory';
import WithdrawRequest from './pages/Withdrawal/WithdrawRequest';
import EarningDetails from './pages/Earning/EarningDetails';
import Notification from './pages/Notification';
import Tickets from './pages/Support Management/Tickets';
import FAQ from './pages/Support Management/FAQ';
import DeleteAccountRequest from './pages/Support Management/DeleteAccountRequest';
import GeneralSetting from './pages/General Setting';
import PageManagement from './pages/Page Management';
import Reviewlist from './pages/Adviser/Reviewlist';
import Subscriberlist from './pages/Adviser/SubscriberList';
import PackageEarning from './pages/Earning/PackageEarning';

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
          <Route path="/adviser/list" element={<AdviserList />} />
          <Route path="/adviser/pending" element={<PendingRequest />} />
          <Route path="/adviser/suspended" element={<SuspendedList />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/users/details/:id" element={<UserDetails />} />
          <Route path="/adviser/list/details/:id" element={<AdviserDetails />} />
          <Route path="/adviser/list/details/:id/review" element={<Reviewlist />} />
          <Route path="/adviser/pending/details/:id" element={<PendingAdviserDetails />} />
          <Route path="/adviser/suspended/details/:id" element={<SuspendedAdviserDetails />} />
          <Route path="/completed-calls" element={<CompletedCall />} />
          <Route path="/earning" element={<Earning />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/category/list" element={<Category />} />
          <Route path="/category/skills" element={<Skill />} />
          <Route path="/team-management/list" element={<Teamlist />} />
          <Route path="/team-management/role" element={<TeamRole />} />
          <Route path="/banner-management" element={<BannerManagement />} />
          <Route path="/withdrawal/request" element={<WithdrawRequest />} />
          <Route path="/withdrawal/method" element={<WithdrawalMethod />} />
          <Route path="/withdrawal/history" element={<WalletHistory />} />
          <Route path="/earning/details/:id" element={<EarningDetails />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/support-management/ticket" element={<Tickets />} />
          <Route path="/support-management/faq" element={<FAQ />} />
          <Route path="/support-management/delete-request" element={<DeleteAccountRequest />} />
          <Route path="/general-setting" element={<GeneralSetting />} />
          <Route path="/page-management" element={<PageManagement />} />
          <Route path="/adviser/list/details/:id/subscriber-list" element={<Subscriberlist />} />
          <Route path="/package-earning" element={<PackageEarning />} />
        </Routes>
      </Suspense>
    </Router>
  );
}