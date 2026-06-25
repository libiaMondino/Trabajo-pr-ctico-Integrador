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

  const manejarSubmit = async (e) => {
    e.preventDefault();

    const erroresEncontrados = validar();
    setErrores(erroresEncontrados);

    if (Object.keys(erroresEncontrados).length > 0) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/usuarios/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formulario.email,
            password: formulario.password,

          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMensaje(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      setMensaje("Inicio de sesión exitoso");
      const role = data.role;

      if (role === "super_admin") {
        window.location.href = "/super_admin";
      } else if (role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
      console.log("Token:", data.token);

    } catch (error) {
      console.error(error);
      setMensaje("Error al conectar con el servidor");
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