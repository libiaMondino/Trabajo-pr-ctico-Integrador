import { useState } from "react";

  function NewProduct() {
  const [producto, setProducto] = useState({
    name: "",
    type: "",
    brand: "",
    category: "",
    imgUrl: "",
    price: "",
    percentageDiscount: "",
    stock: "",
    rating: "",
    description: ""
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: producto.name,
      type: producto.type,
      brand: producto.brand,
      category: producto.category,
      imgUrl: producto.imgUrl,
      price: Number(producto.price),
      percentageDiscount: Number(producto.percentageDiscount),
      stock: Number(producto.stock),
      rating: Number(producto.rating),
      description: producto.description
    };

    try {
      const res = await fetch("http://localhost:3001/productos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "Error al crear producto");
        return;
      }

      setMensaje("Producto agregado correctamente");

      setProducto({
        name: "",
        type: "",
        brand: "",
        category: "",
        imgUrl: "",
        price: "",
        percentageDiscount: "",
        stock: "",
        rating: "",
        description: ""
      });

    } catch (error) {
      setMensaje("Error de conexión con el servidor");
    }
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
          name="type"
          placeholder="Tipo"
          value={producto.type}
          onChange={handleChange}
        />
        <input
          name="brand"
          placeholder="Marca"
          value={producto.brand}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Categoría"
          value={producto.category}
          onChange={handleChange}
        />
        <input
          name="imgUrl"
          placeholder="URL de imágen"
          value={producto.imgUrl}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Precio"
          value={producto.price}
          onChange={handleChange}
        />
        <input
          name="percentageDiscount"
          placeholder="percentageDiscount"
          value={producto.percentageDiscount}
          onChange={handleChange}
        />
        <input
          name="stock"
          placeholder="Stock"
          value={producto.stock}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Descripción"
          value={producto.description}
          onChange={handleChange}
        />

        <button type="submit">Crear</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default NewProduct;