import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRoles }) {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // no logueado
  if (!token) {
    return <Navigate to="/login" />;
  }

  // sin permisos
  if (!allowedRoles.includes(role)) {
    return <h2>No tenés permisos para acceder</h2>;
  }

  return children;
}

export default RoleRoute;