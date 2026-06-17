import { Routes, Route } from "react-router";
import { useState } from "react";
import Carrito from "./components/Carrito/Carrito";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import InicioSesion from "./components/InicioSesion/InicioSesion";
import Registracion from "./components/Registracion/Registracion";
import RoleRoute from "./components/RoleRoute/RoleRoute";
import AdminPanel from "./pages/AdminPanel";
import SuperAdminPanel from "./pages/SuperAdminPanel";
import NewProduct from "./pages/NewProduct";
import AdminProductos from "./pages/AdminProductos";
import RoleRoute from "./components/RoleRoute/RoleRoute";
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
