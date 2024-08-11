let productos;
let totalPages = 1; // Asigna un valor por defecto
let currentPage = 1; // Página actual

async function hacerFetch(query, limit, sort, page) {
    const url = `http://localhost:8080/api/products/?query=${query}&limit=${limit}&page=${page}&sort=${sort}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        productos = data.payload;
        totalPages = data.totalPages; // Ajusta según la estructura de tu respuesta
        currentPage = page; // Actualiza la página actual
        mostraProductosDelCarrito(productos);
        renderPaginationButtons();
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

function renderPaginationButtons() {
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = ''; // Limpia los botones anteriores

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.disabled = (i === currentPage); // Deshabilita el botón para la página actual
        button.addEventListener('click', () => {
            const query = document.getElementById("query").value;
            const limit = document.getElementById("limit").value || 10;
            const sort = document.getElementById("sort").value;
            const page = i; // La página actual

            hacerFetch(query, limit, sort, page);
        });

        paginationControls.appendChild(button);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Inicializa con los productos por defecto
    const query = document.getElementById("query").value;
    const limit = document.getElementById("limit").value || 10;
    const sort = document.getElementById("sort").value;
    const page = currentPage; // Página actual

    await hacerFetch(query, limit, sort, page);
});

document.getElementById('pagination-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe y recargue la página

    const query = document.getElementById("query").value;
    const limit = document.getElementById("limit").value || 10;
    const sort = document.getElementById("sort").value;
    const page = currentPage; // Usa la página actual

    await hacerFetch(query, limit, sort, page);
});

async function mostraProductosDelCarrito(arrayDeProductos) {
    const boxProducts = document.getElementById('boxProducts'); // Asegúrate de que este ID exista en tu HTML
    boxProducts.innerHTML = ''; // Limpia el contenido previo

    arrayDeProductos.forEach(element => {
        const div = document.createElement('div');

        const titulo = document.createElement('h2');
        titulo.innerText = element.title;

        const descripcion = document.createElement('p');
        descripcion.innerText = 'Descripción: ' + element.description;

        const precio = document.createElement('p');
        precio.innerText = 'Precio: u$s ' + element.price;

        const categoria = document.createElement('p');
        categoria.innerText = 'Categoría: ' + element.categoria;

        const botonMas = document.createElement('button');
        botonMas.innerText = "Agregar";



        //Click en el botonMas
        botonMas.addEventListener('click', async () => {
            const productId = element._id; // Usa el ID del producto
            const carritoId = input.value // Carrito ID.
            try {
                await fetch('http://localhost:8080/api/carts/' + carritoId + '/products/' + productId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });


            } catch (error) {
                console.error('Error al agregar producto:', error);
            }
            input.value = "";
        });

        const botonMenos = document.createElement('button');
        botonMenos.innerText = "Borrar Producto del Carrito";
        
        //Click en el botonMas
        botonMenos.addEventListener('click', async () => {
            const productId = element._id; // Usa el ID del producto
            const carritoId = input.value // Carrito ID.
            try {
                await fetch('http://localhost:8080/api/carts/' + carritoId + '/products/' + productId, {
                    method: 'Delete',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } catch (error) {
                console.error('Error al agregar producto:', error);
            }
            input.value = "";
        });

        const input = document.createElement('input');
        input.placeholder = "Poner id del carrito:";

        div.appendChild(titulo);
        div.appendChild(descripcion);
        div.appendChild(categoria);
        div.appendChild(precio);
        div.appendChild(input);
        div.appendChild(botonMas);
        div.appendChild(botonMenos);
        boxProducts.appendChild(div);
    });


}

/*
const socket = io(); // Esto ejecuta la conexion de parte del cliente.
const boxProducts = document.querySelector(".boxProducts");

socket.on("home", (data) => {   // Escucho/recibo la informacion del servidor por medio de un evento personalizado.
    boxProducts.innerHTML = "";
    data.forEach(element => {
        const div = document.createElement('div');

        const id = document.createElement('p')
        id.innerText = 'ID: ' + element.id;
        const titulo = document.createElement('h2')
        titulo.innerText = element.title;
        const descripcion = document.createElement('p')
        descripcion.innerText = 'Descripcion: ' + element.description;
        const precio = document.createElement('p')
        precio.innerText = 'Precio: u$s ' + element.price;
        const stock = document.createElement('p')
        stock.innerText = 'Stock: ' + element.stock;
        const categoria = document.createElement('p')
        categoria.innerText = 'Categoria: ' + element.categoria;

        div.appendChild(titulo)
        div.appendChild(id)
        div.appendChild(descripcion)
        div.appendChild(precio)
        div.appendChild(stock)
        div.appendChild(categoria)
        boxProducts.appendChild(div)
    });
});

*/