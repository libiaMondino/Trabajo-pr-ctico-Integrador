import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Carrito from "./components/Carrito/Carrito.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home.jsx";
import InicioSesion from "./components/InicioSesion/InicioSesion.jsx";
import Registracion from "./components/Registracion/Registracion.jsx";
import RoleRoute from "./components/RoleRoute/RoleRoute.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import SuperAdminPanel from "./pages/SuperAdminPanel.jsx";
import NewProduct from "./pages/NewProduct.jsx";
import AdminProductos from "./pages/AdminProductos.jsx";
import { Productos } from "./components/Productos/Productos.jsx";
import { ProductDetails } from "./components/ProductDetails/ProductDetails.jsx";
import "./App.css";


function App() {
  const [busqueda, setBusqueda] = useState("");
  return (
  <>
    <Navbar setBusqueda={setBusqueda}/>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/carrito" element={<PrivateRoute><Carrito /></PrivateRoute>}/>
      <Route path="/productos/:categoria?" element={<Productos busqueda={busqueda} />} />
      <Route path="/productos/:categoria?/:id" element={<ProductDetails/>} />
      <Route path="/login" element={<InicioSesion />} />
      <Route path="/registro" element={<Registracion />} />
      <Route path="/nuevo-producto" element={<NewProduct />} />
      <Route path="/admin" element={<RoleRoute allowedRoles={["admin", "super-admin"]}> <AdminPanel /></RoleRoute>}/>
      <Route path="/super-admin" element={<RoleRoute allowedRoles={["super-admin"]}><SuperAdminPanel /></RoleRoute>}/>
      <Route path="/admin/productos" element={<RoleRoute allowedRoles={["admin", "super-admin"]}><AdminProductos /></RoleRoute>}/>
      <Route path="/admin/nuevo" element={<RoleRoute allowedRoles={["admin", "super-admin"]}><NewProduct /></RoleRoute>}/>
    </Routes>
    
  </>
  )
}

export default App
