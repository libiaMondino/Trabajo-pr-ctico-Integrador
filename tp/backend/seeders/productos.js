import { Producto } from "../models/Producto.js";

export const cargarProductos = async () => {
    const cantidad = await Producto.count();

    if (cantidad === 0) {
        await Producto.bulkCreate([
            {
                name: "Auriculares JBL Tune 520BT",
                type: "Auriculares Inalámbricos",
                brand: "JBL",
                category: "Audio",
                rating: 3,
                imgUrl: "auriculares.jpeg",
                available: true,
                price: 89999,
                percentageDiscount: 15,
                stock: 3,
                description: "Auriculares inalámbricos con sonido potente y gran autonomía para escuchar música todo el día."
            },
            {
                name: "Guitarra Eléctrica Fender Stratocaster HSS",
                type: "Guitarra",
                brand: "Fender",
                category: "Música",
                rating: 4.9,
                imgUrl: "guitarraElectrica.jpg",
                available: true,
                price: 1250000,
                percentageDiscount: 0,
                stock: 40,
                description: "Guitarra eléctrica versátil con excelente calidad de sonido, ideal para rock, blues y pop."
            },
            {
                name: "Parlante Bluetooth Sony SRS-XB100",
                type: "Parlante",
                brand: "Sony",
                category: "Audio",
                rating: 4.5,
                imgUrl: "parlante.jpeg",
                available: false,
                price: 74999,
                percentageDiscount: 20,
                stock: 0,
                description: "Parlante portátil con conectividad Bluetooth, sonido claro y batería de larga duración."
            },
            {
                name: "Piano Eléctrico Yamaha P-125",
                type: "Piano",
                brand: "Yamaha",
                category: "Música",
                rating: 3.7,
                imgUrl: "piano.jpg",
                available: true,
                price: 92999,
                percentageDiscount: 10,
                stock: 25,
                description: "Piano eléctrico con teclas contrapesadas y sonido realista para estudio y práctica."
            },
            {
                name: "Bateria Shelter",
                type: "Bateria",
                brand: "Shelter",
                category: "Música",
                rating: 4.2,
                imgUrl: "bateria.jpeg",
                available: true,
                price: 154999,
                percentageDiscount: 5,
                stock: 12,
                description: "Batería acústica completa con gran respuesta sonora, ideal para principiantes y avanzados."
            },
            {
                name: "Violin Cremona SV-75",
                type: "Violin",
                brand: "Cremona",
                category: "Música",
                rating: 4,
                imgUrl: "violin.jpg",
                available: true,
                price: 65000,
                percentageDiscount: 10,
                stock: 56,
                description: "Violín de excelente construcción y sonido cálido, perfecto para estudiantes."
            },
            {
                name: "Bajo Yamaha TRBX174 Precision",
                type: "Bajo",
                brand: "Yamaha",
                category: "Música",
                rating: 4.4,
                imgUrl: "bajo.jpg",
                available: false,
                price: 75999,
                percentageDiscount: 15,
                stock: 0,
                description: "Bajo eléctrico clásico con tono profundo y gran comodidad para cualquier estilo musical."
            }
        ]);

        console.log("Productos cargados correctamente");
    }
};