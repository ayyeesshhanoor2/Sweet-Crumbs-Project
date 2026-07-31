/*====================================
        SWEET CRUMBS MAIN
====================================*/

// Update cart count

function updateCartCount(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartCount = document.getElementById("cartCount");

    if(cartCount){

        cartCount.innerText = cart.length;

    }

}



// Smooth Scroll

document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        let target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});



// Newsletter

let newsletter=document.querySelector(".newsletter-form");

if(newsletter){

newsletter.addEventListener("submit",function(e){

e.preventDefault();

alert("Thank you for subscribing!");

this.reset();

});

}



// Dark Mode

function toggleDarkMode(){

    document.body.classList.toggle("dark");

}



// Page Load

document.addEventListener("DOMContentLoaded",()=>{

    updateCartCount();

});

// ===================== FEATURED PRODUCTS =====================

document.addEventListener("DOMContentLoaded", () => {

    let featuredContainer = document.getElementById("featuredProducts");

    if (!featuredContainer) return;

    let products = getProducts();

    let featuredProducts = products.filter(product => product.featured);

    featuredProducts.forEach(product => {

        featuredContainer.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <h4>$${product.price.toFixed(2)}</h4>

            <a href="menu.html" class="btn">
                View Menu
            </a>

        </div>

        `;

    });

});
/*====================================
      FEATURED PRODUCTS
====================================*/

function loadFeaturedProducts() {

    const container = document.getElementById("featuredProducts");

    if (!container) return;

    const products = getProducts();

    const featured = products.filter(product => product.featured);

    container.innerHTML = "";

    featured.forEach(product => {

        container.innerHTML += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <h4>$${product.price.toFixed(2)}</h4>

                <a href="menu.html" class="btn">
                    View Menu
                </a>

            </div>
        `;

    });

}

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    loadFeaturedProducts();

});