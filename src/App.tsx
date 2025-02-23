
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { DashboardLayout } from "./components/DashboardLayout";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/Dashboard";
import CheckInOut from "./pages/CheckInOut";
import ActivityLogs from "./pages/ActivityLogs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (adminOnly && profile?.role !== "admin") {
    return <Navigate to="/user/dashboard" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { profile } = useAuth();
  const isAdmin = profile?.role === "admin";

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      
      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="logs" element={<ActivityLogs />} />
      </Route>

      {/* User Routes */}
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="checkin" element={<CheckInOut />} />
      </Route>

      {/* Root redirects */}
      <Route
        path="/"
        element={
          <Navigate
            to={isAdmin ? "/admin/dashboard" : "/user/dashboard"}
            replace
          />
        }
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster position="top-right" />
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
