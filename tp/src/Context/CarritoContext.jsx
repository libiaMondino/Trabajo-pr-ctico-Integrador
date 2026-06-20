import { createContext, useContext, useState } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find(
        (item) => item.id === producto.id
      );

      if (existe) {
        // Control de stock
        if (existe.cantidad >= producto.stock) {
          alert("No hay más stock disponible");
          return carritoActual;
        }

        return carritoActual.map((item) =>
          item.id === producto.id
            ? {
              ...item,
              cantidad:
                item.cantidad + (producto.cantidad || 1),
            }
            : item
        );
      }

      return [
        ...carritoActual,
        {
          ...producto,
          cantidad: producto.cantidad || 1,
        },
      ];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id)
    );
  };

  const aumentarCantidad = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.map((item) => {
        if (item.id === id) {
          if (item.cantidad >= item.stock) {
            alert("Stock máximo alcanzado");
            return item;
          }

          return {
            ...item,
            cantidad: item.cantidad + 1,
          };
        }

        return item;
      })
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        item.id === id
          ? {
            ...item,
            cantidad: Math.max(1, item.cantidad - 1),
          }
          : item
      )
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
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