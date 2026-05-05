const carrito = document.querySelector('#carrito');
const boton = document.querySelector('#boton');

function agregarProducto() {
    const lista = document.getElementById('listaProductos');
    const nuevoProducto = document.createElement('li');
    nuevoProducto.textContent = "producto nuevo";
    lista.appendChild(nuevoProducto);
}

boton.addEventListener("click", function(){
    const nuevoItem = document.createElement("li");
    nuevoItem.textContent = "nuevo item";
    carrito.appendChild(nuevoItem);
});
