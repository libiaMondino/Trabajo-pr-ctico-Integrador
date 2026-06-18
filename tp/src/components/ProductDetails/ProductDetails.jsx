/*LO QUE FALTA: 
*Evaluar compatiilidad de agregarCarrito y carrito(capaz que convenga Context)
*Limpieza input cantidad
*Agregar el renderizado de review
*/

import React from 'react';
import { useState } from 'react';
import { useCarrito } from '../../Context/CarritoContext';
import { useLocation, useParams} from "react-router-dom";
import {Badge, Button, Row, Col, Container} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Star, StarFill } from "react-bootstrap-icons";
import Reseñas from '../Reseñas/Reseñas';

export const ProductDetails = () => {
  
  const { agregarAlCarrito } = useCarrito();
  //Recibe el objeto product de ProductoCard usando navigate 
  const location = useLocation();
  const { name, type, brand, category, rating, imgUrl, available, price, percentageDiscount, stock, description} = location.state.product;
  
  const [cantidad, setCantidad] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Array de iconos de estrellas en función del rating y el precio con descuento
  const ratingStars= Array.from({length: 5},(_, index) =>(
    index < rating ?(
      <StarFill key={index} className="text-warning"/>
    ) : (
      <Star key={index} className="text-warning"/>
    )));
  const discountedPrice = price-(price*(percentageDiscount/100));
  
  // Se verifica que la cantidad ingresada respete el stock
  const handleOnBlur = (e) => {
    const valor = Number(e.target.value); 

    if (!valor){
      setErrorMessage("Ingresar un valor");
      return;}

    if(!Number.isInteger(valor)){
      setErrorMessage("Ingrese un número entero");
      return;}

    if (valor > stock){
      setErrorMessage("La cantidad ingresada supera el stock disponible");
      return;}

    if ( valor < 1){
      setErrorMessage("La cantidad ingresada es menor a la cantidad mínima requerida(1)");
      return;
    }else {
      setErrorMessage("");
    }
  } 

  // Se verifica nuevamente que los valores de cantidad sean acordes al stock y se agregue al carrito
  const handleAgregarAlCarrito = (e) => {
    e.preventDefault();
    const cantNumb = Number(cantidad)
    if (cantNumb> stock || cantNumb < 1 || cantNumb == null || Number.isInteger(cantNumb) == false){
      return;
    }
    
    const productoAlCarrito = {
      name,
      type,
      brand,
      category,
      rating,
      imgUrl,
      available,
      price,
      percentageDiscount,
      stock,
      description,
      cantidad
    };

    //funcion que recibe del componente carrito 
    const { agregarAlCarrito } = useCarrito();
    alert("Producto agregado al carrito");
}

  return (
    <Container className="product-container">
      <Row className="product-row">
        <Col md={6}>
          { imgUrl?  
              (<img
                src={imgUrl}
                alt={`${type} ${brand} ${name}`}
                className='product-image' 
              />
            ):(
              <img
                src="https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
                className='product-image'
              />
            )}
        </Col>

        <Col md={6}>
          <h4 className="text-end text-secondary fs-6">
            Tipo producto: {type}
          </h4>
          <h1 className="product-title">{name}</h1>
          <h3 className="product-brand">Marca: {brand}</h3>
          
          <Row className="mb-4">
            <Col md={3}>
              { available ?
                <Badge bg="success">Disponible</Badge>
                :
                <Badge bg="danger">Sin stock</Badge>
              }
            </Col>
            <Col md={4}>
              {ratingStars}
            </Col>
          </Row>

          
          {
            // Si NO está disponible el carrito, no tenés acceso ni a ingresar cantidad, ni añadir al carrito, ni ver el precio
            // Estas opciones solo se van a renderizar cuando esté disponible el producto
            available == true &&
            <>
              {
                percentageDiscount !== 0 ? (
                  <>
                    <p className="text-decoration-line-through text-muted mb-0">
                      ${price}
                    </p>
                    <h2 className="discounted-price">
                      ${discountedPrice}
                    </h2>
                  </>
                ) 
                : 
                (
                  <h2>${price}</h2>
                )
              }
            
              <h5>Disponibilidad: {stock}</h5>

              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder="Ingresar Cantidad"
                  required
                  min={1}
                  max={stock}
                  value={cantidad}
                  onChange={(e)=>setCantidad(e.target.value)}
                  onBlur={handleOnBlur} 
                  isInvalid={errorMessage !== ""} 
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessage}
                </Form.Control.Feedback>
            </Form.Group>
          
            <Button className="cart-button" onClick={handleAgregarAlCarrito}>
              Añadir al carrito
            </Button>
          </>
          }

          <small className="product-note"> {available? `Descripción: ${description}` : "No se encuentra disponible en este momento" }</small>

        </Col>
      </Row>
      <Row>
        <Reseñas/>
      </Row>
      
    </Container>
  )
}
