import { useContext } from "react";
import { CarritoContext } from "../../Context/CarritoContext";
import "./Carrito.css";

function Carrito() {
  const {
    carrito,
    eliminarDelCarrito,
    aumentarCantidad,
    disminuirCantidad,
    total,
  } = useContext(CarritoContext);

  return (
    <div className="carrito-container">
      <div className="border-bottom pb-3 mb-5">
        <h2 className="carrito-titulo"
          style={{
            fontWeight: "900",
            letterSpacing: "1px",
            fontSize: "2.4rem",
            textTransform: "uppercase",
          }}
        >
          Carrito de compras
        </h2>
      </div>

      {carrito.length === 0 ? (
        <div className="carrito-vacio"
          style={{
            backgroundColor: "#fafafa",
            color: "#555",
          }}
        >
          El carrito está vacío
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {carrito.map((item) => (
            <div key={item.id} className="producto-carrito">
              <div className="row align-items-center">

                {/* Imagen */}
                <div className="col-4 col-md-3 col-lg-2">
                  <div
                    className="d-flex align-items-center justify-content-center p-3 border"
                    style={{
                      backgroundColor: "#fafafa",
                      height: "140px",
                      width: "100%",
                      maxWidth: "140px",
                    }}
                  >
                    <img className="producto-imagen img-fluid"
                      src={
                        item.imgUrl ||
                        "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
                      }
                      alt={item.name}
                      style={{
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>

                {/* Información */}
                <div className="col-8 col-md-4 col-lg-4 ps-3 ps-md-4">
                  <h4
                    className="producto-nombre"
                    style={{ fontSize: "1.4rem" }}
                  >
                    {item.name}
                  </h4>

                  <p className="producto-marca">
                    Marca {item.brand}
                  </p>

                  <h5 className="producto-precio">
                    $ {item.price}
                  </h5>
                </div>

                {/* Cantidad */}
                <div className="col-6 col-md-2 col-lg-3 mt-3 mt-md-0 d-flex justify-content-start justify-content-md-center">
                  <div
                    className="d-flex align-items-center border rounded"
                    style={{
                      height: "38px",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <button
                      className="btn border-0 px-3 fw-bold text-muted"
                      style={{
                        background: "none",
                        fontSize: "1.1rem",
                      }}
                      onClick={() => disminuirCantidad(item.id)}
                      disabled={item.cantidad <= 1}
                    >
                      −
                    </button>

                    <span
                      className="px-2 fw-semibold text-dark"
                      style={{
                        minWidth: "24px",
                        textAlign: "center",
                      }}
                    >
                      {item.cantidad}
                    </span>

                    <button
                      className="btn border-0 px-3 fw-bold text-muted"
                      style={{
                        background: "none",
                        fontSize: "1.1rem",
                      }}
                      onClick={() => aumentarCantidad(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Eliminar */}
                <div className="col-6 col-md-3 col-lg-3 text-end mt-3 mt-md-0">
                  <button
                    className="btn text-white w-100 px-4 py-2 fw-semibold"
                    style={{
                      backgroundColor: "#58091e",
                      borderRadius: "6px",
                      fontSize: "0.9rem",
                      maxWidth: "160px",
                    }}
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

      {/* Total */}
      {carrito.length > 0 && (
        <div className="total-container">

          <span
            className="text-muted"
            style={{ fontSize: "0.85rem" }}
          >
            Gracias por comprar en Tienda de Música
          </span>

          <div className="d-flex align-items-center gap-4">

            <h3
              className="fw-bold text-dark m-0"
              style={{ fontSize: "2rem" }}
            >
              Total: $ {total}
            </h3>

            <button className="btn-finalizar">
              Finalizar compra
            </button>

          </div>

        </div>
      )}
    </div>
  );
}

export default Carrito;