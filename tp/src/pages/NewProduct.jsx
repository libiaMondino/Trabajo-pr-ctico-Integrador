import { useState } from "react";

function NewProduct() {
  const [producto, setProducto] = useState({
    id: Date.now(),
    name: "",
    price: "",
    category: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productosGuardados =
      JSON.parse(localStorage.getItem("productos")) || [];

    const nuevosProductos = [...productosGuardados, producto];

    localStorage.setItem("productos", JSON.stringify(nuevosProductos));

    setMensaje("Producto agregado correctamente");

    setProducto({
      id: Date.now(),
      name: "",
      price: "",
      category: "",
    });
  };

  return (
    <div className="container mt-4">
      <h2>Crear Producto</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nombre"
          value={producto.name}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Precio"
          value={producto.price}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Categoría"
          value={producto.category}
          onChange={handleChange}
        />

        <button type="submit">Crear</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default NewProduct;