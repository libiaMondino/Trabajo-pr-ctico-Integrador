import { useState } from "react";
import { Link } from "react-router-dom";

function Registro() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "usuario",

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

    <div>
    <label>Rol:</label>

    <select
      name="rol"
      value={formulario.rol}
      onChange={manejarCambio}
    >
      <option value="usuario">Usuario</option>
      <option value="admin">Admin</option>
      <option value="super-admin">Super Admin</option>
    </select>
    </div>

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (!formulario.email.trim()) {
      nuevosErrores.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formulario.email)) {
      nuevosErrores.email = "El email no es válido";
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
      localStorage.setItem("usuarioRegistrado", JSON.stringify(formulario));
      setMensaje("Registro exitoso");
    }
  };

  return (
  <div className="login-container">

    <div className="login-card">

      <h1 className="login-title">
        Registro de Usuario
      </h1>

      <form onSubmit={manejarSubmit}>

        <div className="login-input">
          <label className="form-label">
            Nombre
          </label>

          <input
            type="text"
            name="nombre"
            className="form-control"
            value={formulario.nombre}
            onChange={manejarCambio}
          />

          {errores.nombre && (
            <p className="error-text">
              {errores.nombre}
            </p>
          )}
        </div>

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

          {errores.email && (
            <p className="error-text">
              {errores.email}
            </p>
          )}
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

          {errores.password && (
            <p className="error-text">
              {errores.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn login-btn text-black"
        >
          Registrarse
        </button>

        <p className="text-center mt-3">
          ¿Ya tenés cuenta?

        <Link to="/login">
          Iniciá sesión
        </Link>
        </p>

      </form>

      {mensaje && (
        <p className="success-text">
          {mensaje}
        </p>
      )}

    </div>

  </div>
);
}



export default Registro;