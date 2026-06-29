//De donde defino cantidad
//Token
import { createContext, useContext, useState } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const[idPedido, setIdPedido] = useState("");

  // AGREGAR AL CARRITO
  const agregarAlCarrito = async (producto, cantidad = 1) => {
    try {
      const res = await fetch("http://localhost:3001/carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productoId: producto.id,
          cantidad,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al agregar al carrito");
      }

      //Se guarda en estado el pedidoId
      const detalle = await res.json();
      setIdPedido(detalle.pedidoId);

      setCarrito((prev) => {
        const existe = prev.find((item) => item.id === producto.id);

        if (existe) {
          const nuevaCantidad = existe.cantidad + cantidad;

          if (nuevaCantidad > producto.stock) {
            alert("No hay más stock disponible");
            return prev;
          }

          return prev.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: nuevaCantidad }
              : item
          );
        }

        return [...prev, { ...producto, cantidad }];
      });
      
    } catch (error) {
      console.error("Error detectado:", error);
      alert(error.message);
    }
  };

  // ELIMINAR ITEM (CORREGIDO)
  const eliminarDelCarrito = async (id) => {
    try {
      const res = await fetch("http://localhost:3001/carrito", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productoId: id,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al eliminar del carrito");
      }

      setCarrito((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
      alert(error.message);
    }
  };

  // AUMENTAR CANTIDAD
  const aumentarCantidad = async (id) => {
    try {
      const item = carrito.find((i) => i.id === id);
      if (!item) return;

      if (item.cantidad >= item.stock) {
        alert("Stock máximo alcanzado");
        return;
      }

      const nuevaCantidad = item.cantidad + 1;

      const res = await fetch("http://localhost:3001/carrito", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          pedidoId: item.pedidoId,
          productoId: item.id,
          cantidad: nuevaCantidad,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      setCarrito((prev) =>
        prev.map((item) =>
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

  // DISMINUIR CANTIDAD
  const disminuirCantidad = async (id) => {
    try {
      const item = carrito.find((i) => i.id === id);
      if (!item) return;

      if (item.cantidad <= 1) {
        alert("La cantidad mínima es 1");
        return;
      }

      const nuevaCantidad = item.cantidad - 1;

      const res = await fetch("http://localhost:3001/carrito", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          pedidoId: item.pedidoId,
          productoId: item.id,
          cantidad: nuevaCantidad,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al actualizar cantidad");
      }

      setCarrito((prev) =>
        prev.map((item) =>
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

  // VACIAR
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // TOTAL (ROBUSTO)
  const total = carrito.reduce(
    (acc, item) => acc + item.price * item.cantidad,
    0
  );

  
    const finalizarCarrito = async () => {

      try {
        const res = await fetch(`http://localhost:3001/carrito/${idPedido}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error(data.message);
        }
        vaciarCarrito();
        alert("Ha finalizado su pedido con éxito!");

      } catch (error) {
        console.error("5. Error:", error);
        alert(error.message);
      };
  }
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
        finalizarCarrito
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);