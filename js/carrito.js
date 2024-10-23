const cartItemsContainer = document.querySelector('.cart-items');
        const cartTotalDisplay = document.getElementById('cart-total');
        const cartCountElement = document.getElementById('cart-count');
        let cart = [];
        let cartCount = 0;

        document.addEventListener('DOMContentLoaded', () => {
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
            const savedCartCount = localStorage.getItem('cartCount') || 0;

            if (savedCart.length > 0) {
                cart = savedCart;
                cartCount = parseInt(savedCartCount);
                renderCart();
                updateCartCount();
            }
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const name = button.getAttribute('data-name');
                const price = parseFloat(button.getAttribute('data-price'));

                addToCart(name, price);
            });
        });

        function addToCart(name, price) {
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            cartCount++; 
            updateCartCount(); 
            saveCart();
            renderCart();
        }

        function renderCart() {
            cartItemsContainer.innerHTML = '';

            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.name}')">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });

            updateTotal();
        }

        function removeFromCart(name) {
            const itemToRemove = cart.find(item => item.name === name);

            if (itemToRemove) {
                cartCount -= itemToRemove.quantity; 
            }
            cart = cart.filter(item => item.name !== name);

            updateCartCount();
            saveCart(); 
            renderCart();
        }

        function updateTotal() {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotalDisplay.textContent = total.toFixed(2);
        }

        function updateCartCount() {
            cartCountElement.innerText = cartCount; 
        }

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('cartCount', cartCount);
        }

        document.getElementById('checkout-btn').addEventListener('click', () => {
            alert('Proceeding to checkout with total: $' + cartTotalDisplay.textContent);
        });