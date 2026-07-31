let products = JSON.parse(localStorage.getItem("products"));

if (!products) {

products = [

{
id:1,
name:"Chocolate Chip",
price:250,
category:"Cookies",
image:"images/chocolate-chip.jpg",
description:"Classic chocolate chip cookies baked fresh every day.",
sweetness:5,
featured:true
},

{
id:2,
name:"Double Chocolate",
price:250,
category:"Cookies",
image:"images/double-chocolate.jpg",
description:"Rich chocolate cookie loaded with chocolate chunks.",
sweetness:5
},

{
id:3,
name:"Nutella Cookie",
price:250,
category:"Cookies",
image:"images/nutella-cookie.jpg",
description:"Soft cookie filled with creamy Nutella.",
sweetness:5
},

{
id:4,
name:"Red Velvet",
price:250,
category:"Cookies",
image:"images/red-velvet.jpg",
description:"Red velvet cookie with cream cheese filling.",
sweetness:4
},

{
id:5,
name:"Macadamia",
price:250,
category:"Cookies",
image:"images/macadamia.jpg",
description:"Buttery macadamia nut cookie.",
sweetness:4
},

{
id:6,
name:"Oreo Brownie",
price:350,
category:"Brownies",
image:"images/oreo-brownie.jpg",
description:"Chocolate brownie topped with Oreo.",
sweetness:5,
featured:true
},

{
id:7,
name:"Walnut Brownie",
price:400,
category:"Brownies",
image:"images/walnut-brownie.jpg",
description:"Fudgy brownie with crunchy walnuts.",
sweetness:4
},

{
id:8,
name:"Caramel Brownie",
price:380,
category:"Brownies",
image:"images/caramel-brownie.jpg",
description:"Brownie drizzled with salted caramel.",
sweetness:5
},

{
id:9,
name:"Fudge Brownie",
price:320,
category:"Brownies",
image:"images/fudge-brownie.jpg",
description:"Extra rich and gooey chocolate brownie.",
sweetness:5
},

{
id:10,
name:"Cookie Box (4)",
price:800,
category:"Boxes",
image:"images/cookie-box-4.jpg",
description:"Choose any four cookies.",
sweetness:5
},

{
id:11,
name:"Cookie Box (6)",
price:1200,
category:"Boxes",
image:"images/cookie-box-6.jpg",
description:"Choose any six cookies.",
sweetness:5
},

{
id:12,
name:"Cookie Box (8)",
price:1800,
category:"Boxes",
image:"images/cookie-box-8.jpg",
description:"Choose any eight cookies.",
sweetness:5
}

];

localStorage.setItem("products", JSON.stringify(products));

}

// Display Products
function displayProducts(productList = products) {

    const container = document.getElementById("menuProducts");

    if (!container) return;

    container.innerHTML = "";

    if (productList.length === 0) {

        container.innerHTML = `
            <h2 style="text-align:center;width:100%;">
                No products found.
            </h2>
        `;

        return;
    }

    productList.forEach(product => {

        let badge = "";

        if(product.featured){

            badge = `<span class="badge">BEST SELLER</span>`;

        }

        container.innerHTML += `

        <div class="product-card">

            ${badge}

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>Rs. ${product.price}</p>

            <div class="rating">

                Sweetness:
                ${"⭐".repeat(product.sweetness)}

            </div>

            <div class="product-actions">

                <button
                    class="icon-btn"
                    onclick="quickView(${product.id})">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button
                    class="icon-btn"
                    onclick="addWishlist('${product.name}')">

                    ❤️

                </button>

            </div>

            <button
                class="btn"
                onclick="addToCart(${product.id})">

                Add To Cart

            </button>

        </div>

        `;

    });

}



// SEARCH

function filterProducts(){

    let keyword = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

    let category = document
    .getElementById("categoryFilter")
    .value;

    let filtered = products.filter(product=>{

        let matchName =
        product.name.toLowerCase().includes(keyword);

        let matchCategory =
        category==="all" ||
        product.category===category;

        return matchName && matchCategory;

    });

    displayProducts(filtered);

}



// SORT

function sortProducts(){

    let option =
    document.getElementById("sortPrice").value;

    let sorted = [...products];

    if(option==="low"){

        sorted.sort((a,b)=>a.price-b.price);

    }

    else if(option==="high"){

        sorted.sort((a,b)=>b.price-a.price);

    }

    displayProducts(sorted);

}



// QUICK VIEW

function quickView(id){

    let product =
    products.find(p=>p.id===id);

    if(!product) return;

    document.getElementById("modalImage").src =
    product.image;

    document.getElementById("modalTitle").innerHTML =
    product.name;

    document.getElementById("modalPrice").innerHTML =
    "$"+product.price.toFixed(2);

    document.getElementById("modalDescription").innerHTML =
    product.description;

    document.getElementById("modalCartButton").onclick =
    function(){

        addToCart(id);

        closeModal();

    };

    document.getElementById("productModal").style.display =
    "flex";

}



// CLOSE MODAL

function closeModal(){

    document.getElementById("productModal").style.display =
    "none";

}



// ADD TO CART

function addToCart(id){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let product =
    products.find(p=>p.id===id);

    if(!product) return;

    cart.push(product);

    localStorage.setItem("cart",
    JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart!");

}



// UPDATE CART COUNT

function updateCartCount(){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let count =
    document.getElementById("cartCount");

    if(count){

        count.innerHTML = cart.length;

    }

}



// WISHLIST

function addWishlist(name){

    let popup =
    document.getElementById("wishlistPopup");

    popup.innerHTML =
    "❤️ " + name + " added to Wishlist";

    popup.classList.add("show");

    setTimeout(()=>{

        popup.classList.remove("show");

    },2000);

}



// CLOSE MODAL WHEN CLICKING OUTSIDE

window.onclick=function(event){

    let modal =
    document.getElementById("productModal");

    if(event.target==modal){

        closeModal();

    }

}



// LOAD PAGE

document.addEventListener("DOMContentLoaded",()=>{

    displayProducts();

    updateCartCount();

});