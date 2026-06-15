import { Routes, Route } from "react-router";
import { useState } from "react";
import Carrito from "./components/Carrito/Carrito";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import { Productos } from "./components/Productos/Productos";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import "./App.css";


function App() {
  const [busqueda, setBusqueda] = useState("");
  return (
  <>
    <Navbar setBusqueda={setBusqueda}/>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/productos/:categoria?" element={<Productos busqueda={busqueda} />} />
    </Routes>
    
  </>
  )
}

export default App
