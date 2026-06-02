import React from 'react';
import { useNavigate } from 'react-router';
import {Badge, Card, Button, Row, Col} from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
export const ProductoCard = ({ 
  id,
  name,
  type,
  brand, 
  rating,
  imgUrl,
  available,
  price,
  percentageDiscount,

}) => {
  
  //const navigate= useNavigate();

  const ratingStars= Array.from({length: 5},(_, index) =>(
    index < rating ?(
      <StarFill key={index} className="text-warning"/>
    ) : (
      <Star key={index} className="text-warning"/>
    )));

  const discountedPrice = price-(price*(percentageDiscount/100));
  //const handleOnClick=() => {
    //navigate("/producDetails");
  //};

  return (
    <Card 
      className="shadow-sm p-2"
      style={{
        width:"230px",
        borderRadius: "10px",
      }}>

      <Card.Img
        height={400}
        variant="top"
        src={imgUrl ? imgUrl : "https://us.123rf.com/450wm/get4net/get4net2112/get4net211212024/178947812-fotograf%C3%ADa-en-modo-de-dise%C3%B1o-de-fotograf%C3%ADa-ancha-c%C3%B3ncava-panor%C3%A1mica.jpg"}
        style={{
          height: "140px",
          objectFit: "contain",
          padding: "10px",
        }}
      />

      <Card.Body className="pt-0"
        style={{
          textAlign: "center",
        }}
      >
        <Row className="d-flex justify-content-between align-items-center mb-3">
        
          <Col className="text-start">
              <div className="d-flex justify-content-center align-items-center">
                {ratingStars}
              </div>
          </Col>
            
          <Col className="text-end">
            { available ?
              <Badge bg="success">Disponible</Badge>
              :
              <Badge bg="danger">Sin stock</Badge>
            } 
          </Col>
           
        </Row>

       <Card.Title
        style={{
            fontSize: "16px",
            marginBottom: "0px",
          }}
        >{name}</Card.Title>

        <Card.Text
          className="text-muted"
          style={{
            fontSize: "14px",
            marginBottom: "5px",
          }}
        >
          {brand}
        </Card.Text>

        <Card.Text className="mb-0">
          <strong>
            ${percentageDiscount === 0 ? price : discountedPrice}
          </strong>
        </Card.Text>
      </Card.Body>
      
       <Row>
          <Button 
            variant="dark"
            className="mx-auto d-block boton-comprar"
          >
            Comprar
          </Button>
      </Row>
    </Card>
  )
}
