import React, { useState } from "react";
import "./Reseñas.css";

const Reseñas = () => {
  const [reseñas, setReseñas] = useState([
    {
      id: 1,
      nombre: "Morena",
      comentario: "Muy buen producto, lo recomiendo.",
      estrellas: 5,
    },
  ]);

  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [estrellas, setEstrellas] = useState(0);

  const enviarReseña = (e) => {
    e.preventDefault();

    if (!nombre || !comentario || estrellas === 0) {
      alert("Completá todos los campos");
      return;
    }

    const nuevaReseña = {
      id: Date.now(),
      nombre,
      comentario,
      estrellas,
    };

    setReseñas([nuevaReseña, ...reseñas]);

    setNombre("");
    setComentario("");
    setEstrellas(0);
  };

  const renderEstrellas = (cantidad) => {
    return "⭐".repeat(cantidad);
  };

  return (
    <div className="reseñas-container">
      <h2>Reseñas del producto</h2>

      <form className="reseñas-form" onSubmit={enviarReseña}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <textarea
          placeholder="Escribí tu reseña..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        <div className="estrellas-selector">
          <p>Puntaje:</p>

          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={num <= estrellas ? "estrella activa" : "estrella"}
              onClick={() => setEstrellas(num)}
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit">Enviar reseña</button>
      </form>

      <div className="lista-reseñas">
        {reseñas.length === 0 ? (
          <p>No hay reseñas todavía.</p>
        ) : (
          reseñas.map((reseña) => (
            <div className="reseña-card" key={reseña.id}>
              <h4>{reseña.nombre}</h4>

              <div className="reseña-estrellas">
                {renderEstrellas(reseña.estrellas)}
              </div>

              <p>{reseña.comentario}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reseñas;