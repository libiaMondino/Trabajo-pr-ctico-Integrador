import React from 'react'
import {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
export const Buscador = () => {
    const [busquedaValor, setBusquedaValor] = useState("");
    const handleOnInput= (e) =>{  
        setBusquedaValor(e.target.value);
        
    }
    return (
    <Form>
        <Form.Group>
            <Form.Control
                type="text"
                placeHolder="Buscar producto..."
                value={busquedaValor}
                onInput={handleOnInput}
            />
        </Form.Group>
    </Form>
  )
}
