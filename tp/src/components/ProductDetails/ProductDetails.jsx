import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useCarrito } from '../../Context/CarritoContext';
import { Badge, Button, Row, Col, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Star, StarFill } from "react-bootstrap-icons";
import Reseñas from '../Reseñas/Reseñas';

export const ProductDetails = () => {

  const { agregarAlCarrito } = useCarrito();

  const location = useLocation();

  const {
    id,
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
    description
  } = location.state.product;

  const [cantidad, setCantidad] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const ratingStars = Array.from({ length: 5 }, (_, index) =>
    index < rating ? (
      <StarFill key={index} className="text-warning" />
    ) : (
      <Star key={index} className="text-warning" />
    )
  );

  const discountedPrice = price - (price * (percentageDiscount / 100));

  const handleOnBlur = (e) => {
    const valor = Number(e.target.value);

    if (!valor) {
      setErrorMessage("Ingresar una cantidad");
      return;
    }

    if (!Number.isInteger(valor)) {
      setErrorMessage("Ingrese un número entero");
      return;
    }

    if (valor > stock) {
      setErrorMessage("La cantidad ingresada supera el stock disponible");
      return;
    }

    if (valor < 1) {
      setErrorMessage("La cantidad mínima es 1");
      return;
    }

    setErrorMessage("");
  };

  const handleAgregarAlCarrito = (e) => {
    e.preventDefault();

    const cantNumb = Number(cantidad);

    if (
      !cantNumb ||
      cantNumb < 1 ||
      cantNumb > stock ||
      !Number.isInteger(cantNumb)
    ) {
      setErrorMessage("Cantidad inválida");
      return;
    }

    const productoAlCarrito = {
      id,
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
      cantidad: Number(cantidad),
    };

    agregarAlCarrito(productoAlCarrito);

    alert("Producto agregado al carrito");

    setCantidad("");
    setErrorMessage("");
  };

  return (
    <Container className="product-container">

      <Row className="product-row">

        <Col md={6}>
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={`${type} ${brand} ${name}`}
              className="product-image"
            />
          ) : (
            <img
              src="https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
              alt="Producto sin imagen"
              className="product-image"
            />
          )}
        </Col>

        <Col md={6}>

          <h4 className="text-end text-secondary fs-6">
            Tipo producto: {type}
          </h4>

          <h1 className="product-title">
            {name}
          </h1>

          <h3 className="product-brand">
            Marca: {brand}
          </h3>

          <Row className="mb-4">
            <Col md={3}>
              {available ? (
                <Badge bg="success">Disponible</Badge>
              ) : (
                <Badge bg="danger">Sin stock</Badge>
              )}
            </Col>

            <Col md={4}>
              {ratingStars}
            </Col>
          </Row>

          {available && (
            <>
              {percentageDiscount > 0 ? (
                <>
                  <p className="text-decoration-line-through text-muted mb-0">
                    ${price}
                  </p>

                  <h2 className="discounted-price">
                    ${discountedPrice}
                  </h2>
                </>
              ) : (
                <h2>${price}</h2>
              )}

              <h5>
                Disponibilidad: {stock}
              </h5>

              <Form.Group className="mb-3">

                <Form.Control
                  type="number"
                  placeholder="Ingresar cantidad"
                  min={1}
                  max={stock}
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  onBlur={handleOnBlur}
                  isInvalid={errorMessage !== ""}
                />

                <Form.Control.Feedback type="invalid">
                  {errorMessage}
                </Form.Control.Feedback>

              </Form.Group>

              <Button
                className="cart-button"
                onClick={handleAgregarAlCarrito}
              >
                Añadir al carrito
              </Button>
            </>
          )}

          <div className="mt-3">
            <small className="product-note">
              {available
                ? `Descripción: ${description}`
                : "No se encuentra disponible en este momento"}
            </small>
          </div>

        </Col>

      </Row>

      <Row className="mt-5">
        <Reseñas />
      </Row>

    </Container>
  );
};