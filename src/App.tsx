import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/Layout/Layout';
import AuthLayout from './components/Layout/AuthLayout';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import CoursesPage from './pages/courses/CoursesPage';
import GradesPage from './pages/grades/GradesPage';
import PaymentsPage from './pages/payments/PaymentsPage';
import SchedulePage from './pages/schedule/SchedulePage';
import ProfilePage from './pages/profile/ProfilePage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { useAuthStore } from './stores/authStore';

function App() {
  const { isAuthenticated, isLoading, token } = useAuthStore();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
      >
        <LoadingSpinner message="Loading application..." />
      </Box>
    );
  }

  return (
    <ErrorBoundary>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated && token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/forgot-password"
          element={
            isAuthenticated && token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthLayout>
                <ForgotPasswordPage />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/reset-password"
          element={
            isAuthenticated && token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthLayout>
                <ResetPasswordPage />
              </AuthLayout>
            )
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/grades" element={<GradesPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;