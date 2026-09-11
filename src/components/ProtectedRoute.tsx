import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setAuthenticated(!!session);
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
