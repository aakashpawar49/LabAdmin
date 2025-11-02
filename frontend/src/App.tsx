import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import Unauthorized from "./pages/OtherPage/Unauthorized";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Tables/Reports";
import SoftwareRequests from "./pages/Tables/SoftwareRequests";
import TicketsRaised from "./pages/Tables/TicketsRaised";
import BugsReported from "./pages/Tables/BugsReported";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import StudentDashboard from "./pages/Student/StudentDashboard";
import ReportBugForm from "./pages/Student/ReportBugForm";
import RequestSoftwareForm from "./pages/Student/RequestSoftwareForm";
import LabTechDashboard from "./pages/LabTech/LabTechDashboard";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { RoleBasedRoute } from "./components/auth/RoleBasedRoute";
import { ROLES } from "./constants/roles";
import SimpleLogin from "./components/auth/SimpleLogin";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Dashboard Layout - Protected Routes */}
            <Route element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              {/* Admin and Faculty Dashboard */}
              <Route index path="/" element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.FACULTY]}>
                  <Home />
                </RoleBasedRoute>
              } />

              {/* Student Dashboard */}
              <Route path="/student-dashboard" element={
                <RoleBasedRoute allowedRoles={[ROLES.STUDENT]}>
                  <StudentDashboard />
                </RoleBasedRoute>
              } />
              <Route path="/student/report-bug" element={
                <RoleBasedRoute allowedRoles={[ROLES.STUDENT]}>
                  <ReportBugForm />
                </RoleBasedRoute>
              } />
              <Route path="/student/request-software" element={
                <RoleBasedRoute allowedRoles={[ROLES.STUDENT]}>
                  <RequestSoftwareForm />
                </RoleBasedRoute>
              } />

              {/* Lab Tech Dashboard */}
              <Route path="/lab-tech-dashboard" element={
                <RoleBasedRoute allowedRoles={[ROLES.LAB_TECH]}>
                  <LabTechDashboard />
                </RoleBasedRoute>
              } />

              {/* Profile - All Roles */}
              <Route path="/profile" element={<UserProfiles />} />

              {/* Calendar - Admin and Faculty Only */}
              <Route path="/calendar" element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.FACULTY]}>
                  <Calendar />
                </RoleBasedRoute>
              } />

              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />

              {/* Reports - Admin and Faculty Only */}
              <Route path="/reports/software-requests" element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.FACULTY]}>
                  <SoftwareRequests />
                </RoleBasedRoute>
              } />
              <Route path="/reports/tickets-raised" element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.FACULTY]}>
                  <TicketsRaised />
                </RoleBasedRoute>
              } />
              <Route path="/reports/bugs-reported" element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.FACULTY]}>
                  <BugsReported />
                </RoleBasedRoute>
              } />
              <Route path="/reports" element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.FACULTY]}>
                  <Reports />
                </RoleBasedRoute>
              } />

              {/* Ui Elements */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />

              {/* Charts - Admin and Faculty Only */}
              <Route path="/line-chart" element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.FACULTY]}>
                  <LineChart />
                </RoleBasedRoute>
              } />
              <Route path="/bar-chart" element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.FACULTY]}>
                  <BarChart />
                </RoleBasedRoute>
              } />
            </Route>

            {/* Auth Layout - Public Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/simple-login" element={<SimpleLogin />} />

            {/* Unauthorized Route */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
