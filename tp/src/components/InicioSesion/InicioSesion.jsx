import { useState } from "react";
import { Link } from "react-router-dom";
import "./inicioSesion.css";

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
      localStorage.setItem("usuario", JSON.stringify({
        email: formulario.email,
        rol: "usuario"
        })
      );
      console.log(formulario);const usuarioGuardado = JSON.parse(
      localStorage.getItem("usuarioRegistrado"));

      if (usuarioGuardado && usuarioGuardado.email === formulario.email && usuarioGuardado.password === formulario.password) {
        localStorage.setItem("usuario", JSON.stringify(usuarioGuardado));

        setMensaje("Inicio de sesión exitoso");
      } else {
        setMensaje("Email o contraseña incorrectos");
      }
    }
  };

  return (
  <div className="login-container">

    <div className="login-card">

      <h1 className="login-title">
        Iniciar Sesión
      </h1>

      <form onSubmit={manejarSubmit}>

        <div className="login-input">
          <label className="form-label">
            Email
          </label>

          <input
            type="email"
            name="email"
            className="form-control"
            value={formulario.email}
            onChange={manejarCambio}
          />

          {errores.email &&
            <p className="error-text">
              {errores.email}
            </p>
          }
        </div>

        <div className="login-input">
          <label className="form-label">
            Contraseña
          </label>

          <input
            type="password"
            name="password"
            className="form-control"
            value={formulario.password}
            onChange={manejarCambio}
          />

          {errores.password &&
            <p className="error-text">
              {errores.password}
            </p>
          }
        </div>

        <button
          type="submit"
          className="btn login-btn text-black">
          Ingresar
        </button>
        <p className="text-center mt-3">
          ¿No tenés cuenta?
        <Link to="/registro">
          Registrate
        </Link>
        </p>

      </form>

      {mensaje &&
        <p className="success-text">
          {mensaje}
        </p>
      }

    </div>

  </div>
);
}

export default InicioSesion;