import React from 'react'
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";


function Navbar({setBusqueda}) {
    const navigate = useNavigate();

    const handleOnSubmitSearch= (e) =>{
        e.preventDefault();
        navigate("/productos");
    };
    
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">

            <div className="container-fluid">

                {/* Logo */}
                <a className="navbar-brand fs-4 fw-bold ms-3">
                    TIENDA DE MUSICA
                </a>

                {/* Menú */}
                <div className="d-flex align-items-center">

                    <Link to="productos/Audio" className="menu-btn">
                        Audio
                    </Link>

                    <Link to="productos/Musica" className="menu-btn">
                        Música
                    </Link>

                    <Link to="productos/Ofertas" className="menu-btn">
                        Ofertas
                    </Link>

                </div>

                {/* Buscador */}
                <form className="d-flex search-box" onSubmit={handleOnSubmitSearch}>

                    <input
                        className="form-control"
                        type="search"
                        placeholder="Buscar..."
                        onChange={(e)=>setBusqueda(e.target.value)}
                    />

                    <button className="btn btn-light" >
                        <FaSearch />
                    </button>

                </form>

                <div className="d-flex gap-1">

                    <Link to="/login" className="menu-btn icon-btn">
                        <FaUser size={18} />
                        <p className="m-0">Iniciar Sesión</p>
                    </Link>

                    <Link to="/carrito" className="menu-btn icon-btn">
                        <FaShoppingCart size={18} />
                        <p className="m-0">Carrito</p>
                        <span>Carrito</span>
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;
