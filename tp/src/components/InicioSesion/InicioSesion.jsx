import { useState } from "react";

function InicioSesion() {
  const [formulario, setFormulario] = useState({
    email: "",
    password: "",
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const validar = () => {
    let nuevosErrores = {};

    if (!formulario.email.trim()) {
      nuevosErrores.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formulario.email)) {
      nuevosErrores.email = "Formato de email inválido";
    }

    if (!formulario.password) {
      nuevosErrores.password = "La contraseña es obligatoria";
    } else if (formulario.password.length < 8) {
      nuevosErrores.password =
        "La contraseña debe tener al menos 8 caracteres";
    }

    return nuevosErrores;
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    const erroresEncontrados = validar();
    setErrores(erroresEncontrados);

    if (Object.keys(erroresEncontrados).length === 0) {
      setMensaje("Inicio de sesión exitoso");
      console.log(formulario);
    }
  };

  return (
    <main>
      <div className="logo">
        <img src="img/logo.jpg" alt="logo" />
      </div>

      <h1>Iniciar Sesión</h1>

      <form onSubmit={manejarSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formulario.email}
            onChange={manejarCambio}
          />
          {errores.email && <p>{errores.email}</p>}
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formulario.password}
            onChange={manejarCambio}
          />
          {errores.password && <p>{errores.password}</p>}
        </div>

        <div>
          <button type="submit">Ingresar</button>
        </div>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </main>
  );
}

export default InicioSesion;