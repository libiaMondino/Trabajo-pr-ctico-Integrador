import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const usuarioLogueado = localStorage.getItem("usuario");

  return usuarioLogueado
    ? children
    : <Navigate to="/login" />;
}

export default PrivateRoute;