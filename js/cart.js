/*====================================
            CART
====================================*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/*==============================
        SAVE CART
==============================*/

function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

}

/*==============================
        UPDATE CART COUNT
==============================*/

function updateCartCount(){

    const count = document.getElementById("cartCount");

    if(count){

        count.innerText = cart.length;

    }

}

/*==============================
        DISPLAY CART
==============================*/

function displayCart(){

    const cartItems = document.getElementById("cartItems");

    const totalPrice = document.getElementById("totalPrice");

    if(!cartItems) return;

    cartItems.innerHTML = "";

    if(cart.length === 0){

        cartItems.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    Your cart is empty.
                </td>
            </tr>
        `;

        if(totalPrice){

            totalPrice.innerText = "$0.00";

        }

        return;

    }

    let total = 0;

    cart.forEach((product,index)=>{

        total += product.price;

        cartItems.innerHTML += `

        <tr>

            <td>${product.name}</td>

            <td>${product.category}</td>

            <td>$${product.price.toFixed(2)}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="removeCartItem(${index})">

                    Remove

                </button>

            </td>

        </tr>

        `;

    });

    if(totalPrice){

        totalPrice.innerText = "$" + total.toFixed(2);

    }

}

/*==============================
        REMOVE ITEM
==============================*/

function removeCartItem(index){

    cart.splice(index,1);

    saveCart();

    displayCart();

    updateCartCount();

}

/*==============================
        CLEAR CART
==============================*/

function clearCart(){

    if(confirm("Are you sure you want to clear the cart?")){

        cart = [];

        saveCart();

        displayCart();

        updateCartCount();

    }

}

/*==============================
        CHECKOUT
==============================*/

function checkout(){

    if(cart.length===0){

        alert("Your cart is empty!");

        return;

    }

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

    let total = 0;

    cart.forEach(item=>{

        total += item.price;

    });

    let order = {

        id: Date.now(),

        items: cart,

        total: total,

        status: "Pending"

    };

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    cart = [];

    saveCart();

    alert("Order placed successfully!");

    window.location.href = "index.html";

}

/*==============================
        INITIALIZE
==============================*/

document.addEventListener("DOMContentLoaded",()=>{

    displayCart();

    updateCartCount();

});