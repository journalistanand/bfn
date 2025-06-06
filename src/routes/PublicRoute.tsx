import { Navigate, Outlet } from 'react-router-dom';

interface PublicRouteProps {
  isAuthenticated?: boolean;
  restricted?: boolean;
}

const PublicRoute = ({ isAuthenticated = false, restricted = false }: PublicRouteProps) => {
  if (isAuthenticated && restricted) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;