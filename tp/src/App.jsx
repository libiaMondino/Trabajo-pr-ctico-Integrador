import { Routes, Route } from "react-router";
import Carrito from "./components/Carrito/Carrito";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import "./App.css";


function App() {
  
  return (
  <>
    <Navbar/>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/carrito" element={<Carrito />} />
    </Routes>
    
  </>
  )
}

export default App
