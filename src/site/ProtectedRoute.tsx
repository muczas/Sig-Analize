import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="text-white text-center mt-10">Ładowanie...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}