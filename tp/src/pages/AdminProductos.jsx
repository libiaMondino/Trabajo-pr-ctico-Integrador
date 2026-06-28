import { useEffect, useState } from "react";
import "./adminProductos.css";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdit, setFormEdit] = useState({});

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await fetch("http://localhost:3001/productos");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // ELIMINAR
  const eliminarProducto = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que querés eliminar este producto? Esta acción no se puede deshacer."
    );

    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:3001/productos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // INICIAR EDICIÓN INLINE
  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id);
    setFormEdit(producto);
  };

  // CAMBIOS EN INPUTS
  const handleChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  // GUARDAR EDICIÓN
  const guardarEdicion = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...formEdit,
        price: Number(formEdit.price),
        percentageDiscount: Number(formEdit.percentageDiscount),
        stock: Number(formEdit.stock),
        rating: Number(formEdit.rating),
      };

      await fetch(`http://localhost:3001/productos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      setEditandoId(null);
      obtenerProductos();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  return (
    <div className="container">
      <h2>ABM Productos</h2>

      {productos.map((p) => (
        <div key={p.id} className="border">

          {editandoId === p.id ? (
            <>
              <label>Nombre:</label>
              <input
                name="name"
                value={formEdit.name}
                onChange={handleChange}
              />

              <label>Marca:</label>
              <input
                name="brand"
                value={formEdit.brand}
                onChange={handleChange}
              />

              <label>Tipo:</label>
              <input
                name="type"
                value={formEdit.type}
                onChange={handleChange}
              />

              <label>Categoría:</label>
              <input
                name="category"
                value={formEdit.category}
                onChange={handleChange}
              />

              <label>Precio:</label>
              <input
                name="price"
                value={formEdit.price}
                onChange={handleChange}
              />

              <label>Descuento (%):</label>
              <input
                name="percentageDiscount"
                value={formEdit.percentageDiscount}
                onChange={handleChange}
              />

              <label>Stock:</label>
              <input
                name="stock"
                value={formEdit.stock}
                onChange={handleChange}
              />

              <label>Rating:</label>
              <input
                name="rating"
                value={formEdit.rating}
                onChange={handleChange}
              />

              <label>Imagen (URL):</label>
              <input
                name="imgUrl"
                value={formEdit.imgUrl}
                onChange={handleChange}
              />

              <label>Descripción:</label>
              <input
                name="description"
                value={formEdit.description}
                onChange={handleChange}
              />

              <button
                className="btn-save"
                onClick={() => guardarEdicion(p.id)}
              >
                Guardar
              </button>

              <button
                className="btn-cancel"
                onClick={() => setEditandoId(null)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <h4>{p.name}</h4>
              <p>Marca: {p.brand}</p>
              <p>Tipo: {p.type}</p>
              <p>Categoría: {p.category}</p>
              <p>Precio: ${p.price}</p>
              <p>Descuento: {p.percentageDiscount}%</p>
              <p>Stock: {p.stock}</p>
              <p>Rating: {p.rating}</p>
              <p>{p.description}</p>

              <button
                className="btn-edit"
                onClick={() => iniciarEdicion(p)}
              >
                Editar
              </button>

              <button
                className="btn-delete"
                onClick={() => eliminarProducto(p.id)}
              >
                Eliminar
              </button>
            </>
          )}

        </div>
      ))}
    </div>
  );
}

export default AdminProductos;