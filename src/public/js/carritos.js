let productos;
const idCarrito = document.getElementById("id-carrito").textContent;

async function hacerfetch() {
    const url = 'http://localhost:8080/api/carts/' + idCarrito;
    try {
        const response = await fetch(url);
        const data = await response.json();

        productos = data.payload.products;
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
    mostraProductosDelCarrito(productos)
}

document.addEventListener('DOMContentLoaded', async () => {
    hacerfetch()
});


async function mostraProductosDelCarrito(arrayDeProductos) {
    const boxProducts = document.getElementById('boxProducts'); // Asegúrate de que este ID exista en tu HTML
    boxProducts.innerHTML = "";


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


        const botonMas = document.createElement('button');
        botonMas.innerText = "Agregar";

        //Click en el botonMas
        botonMas.addEventListener('click', async () => {
            const productId = element._id._id; // Usa el ID del producto
            try {
                await fetch('http://localhost:8080/api/carts/' + idCarrito + '/products/' + productId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });


            } catch (error) {
                console.error('Error al agregar producto:', error);
            }
            hacerfetch();
        });

        const botonMenos = document.createElement('button');
        botonMenos.innerText = "Borrar Producto del Carrito";

        //Click en el botonMas
        botonMenos.addEventListener('click', async () => {
            const productId = element._id._id; // Usa el ID del producto

            try {
                await fetch('http://localhost:8080/api/carts/' + idCarrito + '/products/' + productId, {
                    method: 'Delete',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } catch (error) {
                console.error('Error al agregar producto:', error);
            }

            hacerfetch();
        });

        div.appendChild(titulo);
        div.appendChild(descripcion);
        div.appendChild(categoria);
        div.appendChild(precio);
        div.appendChild(cantidad);
        div.appendChild(botonMas);
        div.appendChild(botonMenos);
        boxProducts.appendChild(div);
    });
}


