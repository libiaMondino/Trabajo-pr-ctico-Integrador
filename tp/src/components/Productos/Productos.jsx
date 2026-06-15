import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductoCard } from '../ProductoCard/ProductoCard';

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
        imgUrl: "",
        available: true,
        price: 89999,
        percentageDiscount: 15,
        stock: 3,
        description: "YEAHHH"
    },
    {
        id: 2,
        name: "Guitarra Eléctrica Stratocaster",
        type: "Guitarra",
        brand: "Fender",
        category: "musica",
        rating: 4.9,
        imgUrl: "https://example.com/fender-stratocaster.jpg",
        available: true,
        price: 1250000,
        percentageDiscount: 0,
        stock: 40,
        description: "YEAHHH"
    },
    {
        id: 3,
        name: "Parlante Bluetooth Sony SRS-XB100",
        type: "Parlante",
        brand: "Sony",
        category: "audio",
        rating: 4.5,
        imgUrl: "https://example.com/sony-srsxb100.jpg",
        available: false,
        price: 74999,
        percentageDiscount: 20,
        stock: 0,
        description:"NOOOOO"
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
