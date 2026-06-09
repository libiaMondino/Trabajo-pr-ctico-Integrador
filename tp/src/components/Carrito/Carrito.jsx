import { useState } from "react";

function App() {
  const productos = [
    { id: 1, nombre: "Guitarra", precio: 1200 },
    { id: 2, nombre: "Batería", precio: 3000 },
    { id: 3, nombre: "Piano", precio: 5000 },
  ];

  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
  };

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Tienda de Instrumentos</h1>

      <h2>Productos</h2>

      {productos.map((producto) => (
        <div
          key={producto.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{producto.nombre}</h3>
          <p>${producto.precio}</p>

          <button onClick={() => agregarAlCarrito(producto)}>
            Agregar al carrito
          </button>
        </div>
      ))}

      <hr />

      <h2>Carrito</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        carrito.map((item) => (
          <div
              key={item.id}            
              style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4>{item.nombre}</h4>
            <p>${item.precio}</p>

            <button onClick={() => eliminarDelCarrito(item.id)}>
              Eliminar
            </button>
          </div>
        ))
      )}

      <h2>Total: ${total}</h2>
    </div>
  );
}

export default App;