import { useEffect, useState } from "react";

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
    <div>
      <h1>Super Admin Panel</h1>

      {usuarios.map((u) => (
        <div key={u.id} style={{ border: "1px solid black", margin: 10 }}>
          <p>{u.name}</p>
          <p>{u.email}</p>
          <p>{u.role}</p>

          <button onClick={() => cambiarRol(u.id, "admin")}>
            Hacer admin
          </button>

          <button onClick={() => cambiarRol(u.id, "usuario")}>
            Hacer usuario
          </button>

          <button onClick={() => eliminarUsuario(u.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

export default SuperAdminPanel;