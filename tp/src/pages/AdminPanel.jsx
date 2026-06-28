import { Link } from "react-router-dom";
import "./adminPanel.css";

function AdminPanel() {
  return (
    <div className="admin-home">

      <h1 className="admin-title">Panel de Administración</h1>

      <p className="admin-subtitle">Seleccione una opción:</p>

      <div className="admin-options">

        <Link to="/admin/productos" className="admin-card">
          <h3>Administrar productos</h3>
          <p>Editar, eliminar y ver stock</p>
        </Link>

        <Link to="/admin/nuevo" className="admin-card">
          <h3>Crear producto</h3>
          <p>Agregar nuevos productos</p>
        </Link>

      </div>

    </div>
  );
}

export default AdminPanel;