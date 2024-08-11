let productos;
document.addEventListener('DOMContentLoaded', async () => {
    const idCarrito = document.getElementById("id-carrito").textContent;
    const url = 'http://localhost:8080/api/carts/' + idCarrito;

    try {
        const response = await fetch(url);
        const data = await response.json();

        productos = data.payload.products;
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
    mostraProductosDelCarrito(productos)
});

async function mostraProductosDelCarrito(arrayDeProductos) {
    const boxProducts = document.getElementById('boxProducts'); // Asegúrate de que este ID exista en tu HTML


    arrayDeProductos.forEach(element => {
        const div = document.createElement('div');

        const titulo = document.createElement('h2');
        titulo.innerText = element._id.title;

        const descripcion = document.createElement('p');
        descripcion.innerText = 'Descripcion: ' + element._id.description;

        const precio = document.createElement('p');
        precio.innerText = 'Precio: u$s ' + element._id.price;

        const categoria = document.createElement('p');
        categoria.innerText = 'Categoria: ' + element._id.categoria;

        const cantidad = document.createElement('p');
        cantidad.innerText = 'Cantidad: ' + element.quantity;


        div.appendChild(titulo);
        div.appendChild(descripcion);
        div.appendChild(categoria);
        div.appendChild(precio);
        div.appendChild(cantidad);
        boxProducts.appendChild(div);
    });
}


