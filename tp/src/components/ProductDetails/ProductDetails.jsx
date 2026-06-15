/*LO QUE FALTA: 
*El uso de useLocation relacionado con productoCard
*Ver qué argumentos pasarle a la función agregarAlCarrito y cómo obtenerlo
*Limpieza input cantidad
*Validación cuando el campo esta vacío(mensaje correcto)
*Agregar el renderizado de review
*Agregar categoria como atributo de producto(musica, audio, para hacer el filtro);
*/

import React from 'react';
import { useState } from 'react';
import { useLocation, useParams} from "react-router";
import {Badge, Button, Row, Col, Container} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Star, StarFill } from "react-bootstrap-icons";

export const ProductDetails = ({name, type, brand, category, rating, imgUrl, available, price, percentageDiscount, stock, description}) => {
  //const {name, type, brand, rating, imgUrl, available, price, percentageDiscount, stock, description} = producto;
  //const location = useLocation();
  //const { id } = useParams();
  // Lo que recibe del navigation(el objeto que trae = instrument) desde la card
  //const { name, type, brand, rating, imgUrl, available, price, percentageDiscount, stock, description} = location.state.instrument;
  
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
    if (valor > stock){
      setErrorMessage("La cantidad ingresada supera el stock disponible");
    } else if ( valor < 1){
      setErrorMessage("La cantidad ingresada es menor a la cantidad mínima requerida(1)");
    } else {
      setErrorMessage("");
    }
  } 

  // Se verifica nuevamente que los valores de cantidad sean acordes al stock y se agregue al carrito
  const handleAgregarAlCarrito = (e) => {
    if (cantidad > stock || cantidad < 1 || cantidad == null){
      return;
    }
    //funcion que recibe del componente carrito 
    /*const productoAlCarrito={
      ...producto,
      cantidad: {cantidad}
    }*/
    //agregarAlCarrito();
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
                  min={1}
                  max={stock}
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
      
          <small className="product-note">Descripción: {description}</small>

        </Col>
      </Row>
      <Row>
        <>
      rating
      </>
      </Row>
      
    </Container>
  )
}
