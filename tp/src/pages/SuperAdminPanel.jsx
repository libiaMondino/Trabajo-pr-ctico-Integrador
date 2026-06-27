import { useEffect, useState } from "react";
import "./superAdminPanel.css";

function SuperAdminPanel() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3001/usuarios", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Error backend:", data.message);
        setUsuarios([]);
        return;
      }

      setUsuarios(data);
    } catch (error) {
      console.log(error);
      setUsuarios([]);
    }
  };

  const cambiarRol = async (id, nuevoRol) => {
    await fetch(`http://localhost:3001/usuarios/usuarios/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ role: nuevoRol }),
    });

    obtenerUsuarios();
  };

  const eliminarUsuario = async (id) => {
    await fetch(`http://localhost:3001/usuarios/super_admin/usuarios/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    obtenerUsuarios();
  };

  return (
    <div className="superadmin-container">

      <h1 className="superadmin-title">Panel Super Admin</h1>

      <div className="user-grid">

        {usuarios.map((u) => (
          <div key={u.id} className="user-card">

            <div className="user-info">
              <h3>{u.name}</h3>
              <p>{u.email}</p>

              <span className={`role-badge ${u.role}`}>
                {u.role}
              </span>
            </div>

            <div className="user-actions">

              <button
                className="btn-admin btn-green"
                onClick={() => cambiarRol(u.id, "admin")}
              >
                Hacer admin
              </button>

              <button
                className="btn-admin btn-blue"
                onClick={() => cambiarRol(u.id, "usuario")}
              >
                Usuario
              </button>

              <button
                className="btn-admin btn-red"
                onClick={() => eliminarUsuario(u.id)}
              >
                Eliminar
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default SuperAdminPanel;