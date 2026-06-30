import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { currentUser, isAdmin } = useAuth();

  // Not logged in at all — send to login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Route requires admin, but this user isn't one — send back home
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Logged in (and admin if required) — show the page
  return children;
}
