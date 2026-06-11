import { BrowserRouter, Routes, Route } from "react-router";
import Carrito from "./components/Carrito/Carrito";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";

function App() {
  //Rutas e importar componentes
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
