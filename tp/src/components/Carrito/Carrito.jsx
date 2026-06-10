import { useState } from "react";

function App() {
  const productos = [
    { id: 1, nombre: "Guitarra", precio: 1200, cantidad: 10 },
    { id: 2, nombre: "Batería", precio: 3000, cantidad: 2 },
    { id: 3, nombre: "Piano", precio: 5000, cantidad: 5 },
  ];

  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const yaExiste = carritoActual.find((item) => item.id === producto.id);

      if (yaExiste) {
        // 🚨 IF DE CONTROL: Si ya alcanzó el stock máximo disponible, no hacemos nada
        if (yaExiste.cantidad >= producto.cantidad) {
          alert(`¡No hay más stock disponible de ${producto.nombre}!`);
          return carritoActual; // Devuelve el carrito tal cual, sin cambios
        }

        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      // Si es el primero y el stock original es 0 (por las dudas)
      if (producto.cantidad <= 0) {
        alert("Lo sentimos, este producto está agotado.");
        return carritoActual;
      }

      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
  };

  const aumentarCantidad = (id) => {
    setCarrito(carritoActual =>
      carritoActual.map(item => {
        if (item.id === id) {
          // 🚨 IF DE CONTROL: item.cantidad es lo que tengo en el carrito.
          // Pero ojo, al meter el objeto original, perdimos el valor del "stock" a menos que lo controlemos con el array original 'productos'
          const productoOriginal = productos.find(p => p.id === id);

          if (item.cantidad >= productoOriginal.cantidad) {
            alert("Alcanzaste el límite de stock disponible.");
            return item; // No suma
          }

          return { ...item, cantidad: item.cantidad + 1 };
        }
        return item;
      })
    );
  };
  const disminuirCantidad = (id) => {
    setCarrito(carritoActual =>
      carritoActual.map(item =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, (item.cantidad || 1) - 1) }
          : item
      )
    );
  };

  const total = carrito.reduce((acc, item) => {
    const cantidad = item.cantidad || 1;
    return acc + (item.precio * cantidad);
  }, 0);

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

      <div className="container mt-5" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

        <div className="border-bottom pb-3 mb-5">
          <h2
            className="text-dark m-0"
            style={{
              fontWeight: '900',       // Grosor extra fuerte estilo Figma
              letterSpacing: '1px',    // Espaciado entre letras (tracking)
              fontSize: '2.4rem',
              textTransform: 'uppercase' // Opcional: si quieres mantener el look del logo
            }}
          >
            Carrito de compras
          </h2>
        </div>

        {carrito.length === 0 ? (
          <div className="alert alert-info border-0 shadow-sm" style={{ backgroundColor: '#fafafa', color: '#555' }}>
            El carrito está vacío
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {carrito.map((item) => (
              <div
                key={item.id}
                className="border-0 border-bottom pb-4"
                style={{ borderRadius: '0' }}
              >
                <div className="row align-items-center">

                  {/* 1. Imagen del Producto */}
                  <div className="col-4 col-md-3 col-lg-2">
                    <div
                      className="d-flex align-items-center justify-content-center p-3 border"
                      style={{ backgroundColor: '#fafafa', height: '140px', width: '100%', maxWidth: '140px' }}
                    >
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="img-fluid"
                        style={{ maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </div>
                  </div>

                  {/* 2. Información del Producto */}
                  <div className="col-8 col-md-4 col-lg-4 ps-3 ps-md-4">
                    <h4 className="fw-bold text-dark mb-1" style={{ fontSize: '1.4rem' }}>
                      {item.nombre}
                    </h4>

                    <p className="text-muted small mb-2">
                      Marca {item.marca}
                    </p>

                    <h5 className="fw-bold text-dark mb-0">
                      $ {item.precio}
                    </h5>
                  </div>

                  {/* 3. Selector de Cantidad (Estilo Minimalista) */}
                  <div className="col-6 col-md-2 col-lg-3 mt-3 mt-md-0 d-flex justify-content-start justify-content-md-center">
                    <div
                      className="d-flex align-items-center border rounded"
                      style={{ height: '38px', backgroundColor: '#ffffff' }}
                    >
                      {/* Botón de restar cantidad */}
                      <button
                        className="btn border-0 px-3 fw-bold text-muted"
                        style={{ background: 'none', fontSize: '1.1rem' }}
                        onClick={() => disminuirCantidad(item.id)} // Asegúrate de tener esta función en tu lógica
                        disabled={item.cantidad <= 1}
                      >
                        −
                      </button>

                      {/* Número indicador de cantidad */}
                      <span className="px-2 fw-semibold text-dark" style={{ minWidth: '24px', textAlign: 'center' }}>
                        {item.cantidad || 1}
                      </span>

                      {/* Botón de sumar cantidad */}
                      <button
                        className="btn border-0 px-3 fw-bold text-muted"
                        style={{ background: 'none', fontSize: '1.1rem' }}
                        onClick={() => aumentarCantidad(item.id)}
                        // 🚨 Si la cantidad en el carrito es igual o mayor al stock en 'productos', se deshabilita
                        disabled={item.cantidad >= productos.find(p => p.id === item.id)?.cantidad}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 4. Botón de Eliminar (Color Guinda/Vino de HADAD) */}
                  <div className="col-6 col-md-3 col-lg-3 text-end mt-3 mt-md-0">
                    <button
                      className="btn text-white w-100 w-md-auto px-4 py-2 fw-semibold"
                      style={{
                        backgroundColor: '#58091e',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        maxWidth: '160px'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#420616'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#58091e'}
                      onClick={() => eliminarDelCarrito(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- TOTAL DE LA COMPRA --- */}
        <div className="border-top mt-5 pt-4 mb-5">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
            <span className="text-muted order-2 order-sm-1" style={{ fontSize: '0.85rem' }}>
              Cuadro de texto para detalles adicionales o letra pequeña
            </span>
            <h3 className="fw-bold text-dark order-1 order-sm-2 m-0" style={{ fontSize: '2rem' }}>
              Total: $ {total}
            </h3>
          </div>
        </div>
      </div>


    </div>
  )
}
export default App;