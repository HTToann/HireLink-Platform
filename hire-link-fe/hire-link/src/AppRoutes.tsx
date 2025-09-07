import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { Divider } from "@mantine/core"
import FindJobsPage from './Pages/FindJobs';
import FindTalentPage from './Pages/FindTalentPage';
import TalentProfilePage from './Pages/TalentProfilePage';
import PostJobPage from './Pages/PostJobPage';
import ApplyJobPage from './Pages/ApplyJobPage';
import CompanyPage from './Pages/CompanyPage';
import PostedJobPage from './Pages/PostedJobPage';
import JobHistoryPage from './Pages/JobHistoryPage';
import SignUpPage from './Pages/SignUpPage';
import ProfilePage from './Pages/ProfilePage';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import HomePage from "./Pages/HomePage";
import { useSelector } from "react-redux";
import JobPage from "./Pages/JobPage";
import ProtectedRoute from "./Services/ProtectedRoute";
import PublicRoute from "./Services/PublicRoute";
import UnauthorizedPage from "./Pages/UnauthorizedPage";
import TokenExpirationGuard from "./Guards/TokenExpirationGuard";
import ChatPage from "./Components/ChatPage/ChatPage";
import ChatLayout from "./Components/ChatPage/ChatLayout";

const AppRoutes = () => {
    const user = useSelector((state: any) => state.user);
    return <BrowserRouter>
        <TokenExpirationGuard />
        <div className="relative">
            <Header />
            <Divider size="xs" mx="md" />
            <Routes>
                <Route path="/find-jobs" element={
                    <ProtectedRoute allowedRoles={['APPLICANT']}><FindJobsPage /></ProtectedRoute>} />
                <Route path="/find-talent" element={
                    <ProtectedRoute allowedRoles={['EMPLOYER']}><FindTalentPage /></ProtectedRoute>} />
                <Route path="/post-job/:id" element={
                    <ProtectedRoute allowedRoles={['EMPLOYER']}><PostJobPage /></ProtectedRoute>} />
                <Route path="/jobs/:id" element={<JobPage />} />
                <Route path="/apply-job/:id" element={<ApplyJobPage />} />
                <Route path="/company/:name" element={<CompanyPage />} />
                <Route path="/chat" element={<ChatLayout />}>
                    <Route path=":userId" element={<ChatPage />} />
                </Route>
                <Route path="/job-history" element={
                    <ProtectedRoute ><JobHistoryPage /></ProtectedRoute>} />
                <Route path="/posted-job/:id" element={
                    <ProtectedRoute allowedRoles={['EMPLOYER']}><PostedJobPage /></ProtectedRoute>} />
                <Route path="/sign-up" element={
                    <PublicRoute><SignUpPage /></PublicRoute>} />
                <Route path="/login" element={
                    <PublicRoute><SignUpPage /></PublicRoute>} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/talent-profile/:id" element={<TalentProfilePage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
            <Footer />
        </div>
    </BrowserRouter>
}
export default AppRoutes;