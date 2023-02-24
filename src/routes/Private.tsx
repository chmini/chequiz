import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/store/auth";

interface PrivateProps {
  redirectTo?: string;
  children: JSX.Element;
}

export default function Private({ redirectTo = "/signin", children }: PrivateProps) {
  const isAuth = useAuth();

  const location = useLocation();

  if (!isAuth) {
    return <Navigate replace state={{ from: location.pathname }} to={redirectTo} />;
  }

  return children;
}
