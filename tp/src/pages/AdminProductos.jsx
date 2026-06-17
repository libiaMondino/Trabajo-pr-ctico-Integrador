import { useEffect, useState } from "react";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    name: "",
    price: "",
    category: ""
  });

  useEffect(() => {
    const existe = localStorage.getItem("productos");

    if (!existe) {
        localStorage.setItem(
            "productos",
            JSON.stringify([
                {
                  id: 1,
                  name: "Guitarra",
                  price: 1000,
                  category: "musica",
                },
                {
                  id: 2,
                  name: "Batería",
                  price: 2000,
                  category: "musica",
                },
            ])
        );
    }

    const data =
      JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(data);
  }, []);

  // ELIMINAR
  const eliminarProducto = (id) => {
    const nuevos = productos.filter((p) => p.id !== id);
    setProductos(nuevos);
    localStorage.setItem("productos", JSON.stringify(nuevos));
  };

  // EDITAR
  const iniciarEdicion = (producto) => {
    setEditando(producto);
  };

  const handleChange = (e) => {
    setEditando({
      ...editando,
      [e.target.name]: e.target.value,
    });
  };

  const handleNuevoChange = (e) => {
  setNuevoProducto({
    ...nuevoProducto,
    [e.target.name]: e.target.value
  });
};

  const guardarEdicion = () => {
    const nuevos = productos.map((p) =>
      p.id === editando.id ? editando : p
    );

    setProductos(nuevos);
    localStorage.setItem("productos", JSON.stringify(nuevos));
    setEditando(null);
  };

  return (
    <div className="container mt-4">
      <h2>ABM Productos</h2>

      {productos.map((p) => (
        <div key={p.id} className="border p-2 mb-2">
          <h4>{p.name}</h4>
          <p>${p.price}</p>
          <p>{p.category}</p>

          <button onClick={() => eliminarProducto(p.id)}>
            Eliminar
          </button>

          <button onClick={() => iniciarEdicion(p)}>
            Editar
          </button>
        </div>
      ))}

      {/* FORM MODIFICACIÓN */}
      {editando && (
        <div className="border p-3 mt-4">
          <h3>Editar Producto</h3>

          <input
            name="name"
            value={editando.name}
            onChange={handleChange}
          />

          <input
            name="price"
            value={editando.price}
            onChange={handleChange}
          />

          <input
            name="category"
            value={editando.category}
            onChange={handleChange}
          />

          <button onClick={guardarEdicion}>
            Guardar cambios
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminProductos;