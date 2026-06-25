import { Link } from "react-router-dom";

function AdminPanel() {
  return (
    <div className="container mt-4">
      <h1>Panel de Administración</h1>

      <p>Seleccione una opción:</p>

      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/admin/productos">
          <button>Administrar Productos</button>
        </Link>

        <Link to="/admin/nuevo">
          <button>Crear Producto</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminPanel;