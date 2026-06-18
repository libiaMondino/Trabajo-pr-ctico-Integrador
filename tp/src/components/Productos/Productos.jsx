import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductoCard } from '../ProductoCard/ProductoCard';
import auriculares from "/src/assets/img/img/auriculares.jpeg"
import guitarraElectrica from "/src/assets/img/img/guitarraElectrica.jpg"
import parlante from "/src/assets/img/img/parlante.jpeg"
import piano from "/src/assets/img/img/piano.jpg"
import bateria from "/src/assets/img/img/bateria.jpeg"
import violin from "/src/assets/img/img/violin.jpg"
import bajo from "/src/assets/img/img/bajo.jpg"


export const Productos = ({busqueda}) => {
    //Obtiene la categoria de la URL
    const {categoria} = useParams();

    //ARREGLO DE PRUEBA
    const arreglo=[
    {
        id: 1,
        name: "Auriculares JBL Tune 520BT",
        type: "Auriculares Inalámbricos",
        brand: "JBL",
        category: "audio",
        rating: 3,
        imgUrl: auriculares,
        available: true,
        price: 89999,
        percentageDiscount: 15,
        stock: 3,
        description: "Auriculares inalámbricos con sonido potente y gran autonomía para escuchar música todo el día."
    },
    {
        id: 2,
        name: "Guitarra Eléctrica Stratocaster",
        type: "Guitarra",
        brand: "Fender",
        category: "musica",
        rating: 4.9,
        imgUrl: guitarraElectrica,
        available: true,
        price: 1250000,
        percentageDiscount: 0,
        stock: 40,
        description: "Guitarra eléctrica versátil con excelente calidad de sonido, ideal para rock, blues y pop."
    },
    {
        id: 3,
        name: "Parlante Bluetooth Sony SRS-XB100",
        type: "Parlante",
        brand: "Sony",
        category: "audio",
        rating: 4.5,
        imgUrl: parlante,
        available: false,
        price: 74999,
        percentageDiscount: 20,
        stock: 0,
        description:"Parlante portátil con conectividad Bluetooth, sonido claro y batería de larga duración."
    },
    {
        id: 4,
        name: "Piano Eléctrico Yamaha Psr-e383",
        type: "Piano",
        brand: "Yamaha",
        category: "musica",
        rating: 3.7,
        imgUrl: piano,
        available: true,
        price: 92999,
        percentageDiscount: 10,
        stock: 25,
        description:"Piano eléctrico con teclas contrapesadas y sonido realista para estudio y práctica."
    },
    {
        id: 5,
        name: "Bateria Pearl",
        type: "Bateria",
        brand: "Pearl",
        category: "musica",
        rating: 4.2,
        imgUrl: bateria,
        available: true,
        price: 154999,
        percentageDiscount: 5,
        stock: 12,
        description:"Batería acústica completa con gran respuesta sonora, ideal para principiantes y avanzados."
    },
    {
        id: 6,
        name: "Violin Cremona SV-75",
        type: "Violin",
        brand: "Cremona",
        category: "musica",
        rating: 4,
        imgUrl: violin,
        available: true,
        price: 65000,
        percentageDiscount: 10,
        stock: 56,
        description:"Violín de excelente construcción y sonido cálido, perfecto para estudiantes."
    },
    {
        id: 7,
        name: "Bajo Fender Precision",
        type: "Bajo",
        brand: "Fender",
        category: "musica",
        rating: 4.4,
        imgUrl: bajo,
        available: false,
        price: 75999,
        percentageDiscount: 15,
        stock: 0,
        description:"Bajo eléctrico clásico con tono profundo y gran comodidad para cualquier estilo musical."
    },
    ];
  return (
    <>
    {
        <div>
            <h3 className="ms-3 mt-4">Categoría: {categoria}</h3>
            <div className="d-flex flex-wrap gap-3 ms-3">
                {
                    arreglo.filter((prod)=>{
                        if (busqueda.trim() !== ""){
                            return prod.name.toLowerCase().includes(busqueda.toLowerCase()) 
                        } 
                        if(!categoria){
                            return true;
                        }
                        return categoria === "Ofertas"? prod.percentageDiscount > 0 : categoria.toLowerCase() === prod.category.toLowerCase();
                    
                        })  
                    .map((prod)=> <ProductoCard key={prod.id} {...prod}/>)
                }      
        
            </div>
        </div>
    }  
    </>
  ) 
}
