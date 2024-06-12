import { SellProduct } from "../../../api/venta.api.js";


document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    let suma = 0;
    let productos = [];
    const updateQuantity = (id, increment) => {
        if (cart[id]) {
            if (increment) {
                cart[id].quantity++;
            } else if (cart[id].quantity > 1) {
                cart[id].quantity--;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    };
    

    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';
        suma = 0;
        productos = [];

        for (const id in cart) {
            const product = cart[id];
            let precioTotalProducto = parseFloat(product.price) * product.quantity;
            suma += precioTotalProducto;

            productos.push({id: product.id, cantidad: product.quantity});

            const productRow = document.createElement('tr');
            productRow.className = 'border-t';
            productRow.innerHTML = `
                <td class="px-4 py-2 text-left">
                    <div class="flex items-center">
                        <img src="${product.image}" alt="${product.name}" class="h-12 w-12 object-cover mr-4">
                        <span>${product.name}</span>
                    </div>
                </td>
                <td class="px-4 py-2 text-center flex items-center justify-center">
                    <button class="decrement-btn bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" data-id="${id}">-</button>
                    <input type="text" id="quantity-${id}" value="${product.quantity}" class="w-12 text-center mx-2 border border-gray-300 rounded" readonly>
                    <button class="increment-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" data-id="${id}">+</button>
                </td>
                <td class="px-4 py-2 text-center">$${precioTotalProducto.toFixed(2)}</td>
                <td class="px-4 py-2 text-right">
                    <button class="delete-btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" data-id="${id}">Eliminar</button>
                </td>
            `;
            cartItemsContainer.appendChild(productRow);
        }

        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td colspan="4" class="px-4 py-2 text-center text-lg font-bold border-2 border-gray-800">
                Total: $${suma.toFixed(2)}
            </td>`;
        cartItemsContainer.appendChild(totalRow);

        document.querySelectorAll('.increment-btn').forEach(button => {
            button.addEventListener('click', () => updateQuantity(button.getAttribute('data-id'), true));
        });
        document.querySelectorAll('.decrement-btn').forEach(button => {
            button.addEventListener('click', () => updateQuantity(button.getAttribute('data-id'), false));
        });
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-id');
                delete cart[productId];
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartItems();
            });
        });
    };

    renderCartItems();

    document.getElementById('checkout-btn').addEventListener('click', async () => {
        console.log(suma);
        const fecha = new Date();
        const id = sessionStorage.getItem('userId');
        const email = sessionStorage.getItem('email');

        if (productos.length > 0) {
            await SellProduct(id, fecha, suma, email, productos);
            localStorage.removeItem('cart');
            cart = {};
            renderCartItems();
            alert('Compra realizada con éxito');
        } else {
            alert('No hay productos en el carrito');
        }
    });
});
