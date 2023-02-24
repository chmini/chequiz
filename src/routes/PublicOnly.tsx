import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/store/auth";

import type { Location } from "react-router-dom";

interface LocationState {
  from: string;
}

interface LocationWithState extends Location {
  state: LocationState | null;
}

interface PublicOnlyProps {
  children: JSX.Element;
}

export default function PublicOnly({ children }: PublicOnlyProps) {
  const isAuth = useAuth();

  const location: LocationWithState = useLocation();

  if (isAuth) {
    return <Navigate replace to={location.state?.from ?? "/"} />;
  }

  return children;
}
