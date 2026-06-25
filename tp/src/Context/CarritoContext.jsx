//De donde defino cantidad
//Token
import { createContext, useContext, useState } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = async (producto) => {
  try {
    const res = await fetch('http://localhost:3001/carrito', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        productoId: producto.id,
        cantidad
      })
    });

    // Manejo de error del backend
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al agregar al carrito");
    }

    // Actualización del estado SOLO si el backend fue exitoso
    setCarrito((carritoActual) => {
      const existe = carritoActual.find(item => item.id === producto.id);

      if (existe) {
        if (existe.cantidad + cantidad > producto.stock) {
          alert("No hay más stock disponible");
          return carritoActual;
        }

        return carritoActual.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      return [
        ...carritoActual,
        { ...producto, cantidad }
      ];
    });

  } catch (error) {
    console.error("Error detectado:", error);
    alert(error.message);
  }
};

  const eliminarDelCarrito = async (id) => {
    // Método DELETE de detallePedido
    try {
      const res = await fetch(`http://localhost:3001/carrito`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al eliminar del carrito");
      }

      setCarrito((carritoActual) =>
        carritoActual.filter((item) => item.id !== id)
      );

    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
      alert(error.message);
    }
  };

  const aumentarCantidad = async (id) => {
    try {
      // Se busca el item actual en el carrito
      const itemActual = carrito.find(item => item.id === id);

      if (!itemActual) return; // Si no lo encuentra

      if (itemActual.cantidad >= itemActual.stock) {
        alert("Stock máximo alcanzado");
        return;
      }
      //Se establece cantidad
      const nuevaCantidad = itemActual.cantidad + 1;

      const res = await fetch(`http://localhost:3001/carrito`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          pedidoId: itemActual.pedidoId,   
          productoId: itemActual.id,       
          cantidad: nuevaCantidad          
        })
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message);
        }

        //const data = await res.json();

        // actualizar frontend
        setCarrito((carritoActual) =>
          carritoActual.map((item) =>
            item.id === id
              ? { ...item, cantidad: nuevaCantidad }
              : item
          )
        );

      } catch (error) {
        console.error("Error al aumentar cantidad:", error);
        alert(error.message);
      }
    };

      

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const disminuirCantidad = async (id) => {
  try {
    const itemActual = carrito.find(item => item.id === id);

    if (!itemActual) return;

    if (itemActual.cantidad <= 1) {
      alert("La cantidad mínima es 1");
      return;
    }

    const nuevaCantidad = itemActual.cantidad - 1;

    const res = await fetch(`http://localhost:3001/carrito`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        pedidoId: itemActual.pedidoId,
        productoId: itemActual.id, // o itemActual.productoId según tu modelo
        cantidad: nuevaCantidad
      })
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al actualizar cantidad");
    }

    // actualizar frontend
    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        item.id === id
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );

  } catch (error) {
    console.error("Error al disminuir cantidad:", error);
    alert(error.message);
  }
};

  const total = carrito.reduce(
    (acc, item) => acc + item.price * item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        aumentarCantidad,
        disminuirCantidad,
        vaciarCarrito,
        total,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);