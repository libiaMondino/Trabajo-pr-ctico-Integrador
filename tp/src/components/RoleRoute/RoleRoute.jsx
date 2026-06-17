import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRoles }) {

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(usuario.rol)) {
    return <h2>No tiene permisos para acceder</h2>;
  }

  return children;
}

export default RoleRoute;