import { useEffect, useState } from "react";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/productos"
      );

      const data = await response.json();

      setProductos(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // ELIMINAR
  const eliminarProducto = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3001/productos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        return;
      }

      obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
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

  const guardarEdicion = async () => {
    try {
      const payload = { // = carga útil
        name: editando.name,
        type: editando.type,
        brand: editando.brand,
        category: editando.category,
        imgUrl: editando.imgUrl,
        price: Number(editando.price),
        percentageDiscount: Number(editando.percentageDiscount),
        stock: Number(editando.stock),
        rating: Number(editando.rating),
        description: editando.description
      };
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3001/productos/${editando.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        return;
      }

      obtenerProductos();
      setEditando(null);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>ABM Productos</h2>

      {productos.map((p) => (
        <div key={p.id} className="border p-2 mb-2">
          <h4>{p.name}</h4>
          <p>{p.type}</p>
          <p>{p.brand}</p>
          <p>{p.category}</p>
          <p>{p.rating}</p>
          <p>{p.imgUrl}</p>
          <p>${p.price}</p>
          <p>{p.percentageDiscount}</p>
          <p>{p.stock}</p>
          <p>{p.description}</p>

          <button onClick={() => eliminarProducto(p.id)}>
            Eliminar
          </button>

          <button onClick={() => iniciarEdicion(p)}>
            Editar
          </button>
        </div>
      ))}

      {editando && (
        <div className="border p-3 mt-4">
          <h3>Editar Producto</h3>

          <input
          name="name"
          placeholder="Nombre"
          value={editando.name}
          onChange={handleChange}
        />
        <input
          name="type"
          placeholder="Tipo"
          value={editando.type}
          onChange={handleChange}
        />
        <input
          name="brand"
          placeholder="Marca"
          value={editando.brand}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Categoría"
          value={editando.category}
          onChange={handleChange}
        />
        <input
          name="imgUrl"
          placeholder="URL de imágen"
          value={editando.imgUrl}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Precio"
          value={editando.price}
          onChange={handleChange}
        />
        <input
          name="percentageDiscount"
          placeholder="percentageDiscount"
          value={editando.percentageDiscount}
          onChange={handleChange}
        />
        <input
          name="stock"
          placeholder="Stock"
          value={editando.stock}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Descripción"
          value={editando.description}
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