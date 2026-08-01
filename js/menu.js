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

            <div class="qty-control">

    <button onclick="changeProductQty(${product.id},-1)">-</button>

    <span id="productQty${product.id}">1</span>

    <button onclick="changeProductQty(${product.id},1)">+</button>

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
"Rs. " + product.price;

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

let selectedBox = null;
let selectedCookies = {};
let totalSelected = 0;

function addToCart(id){

    let product = products.find(p => p.id === id);

    if(!product) return;

    if(product.category === "Boxes"){

        selectedBox = product;

        openCookieBox(product);

        return;

    }

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

   let qty = productQty[id] || 1;

cart.push({

    ...product,

    quantity: qty

});

    localStorage.setItem("cart",
    JSON.stringify(cart));

    updateCartCount();

    showToast(product.name + " added to cart!");

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

function openCookieBox(box){

    selectedCookies = {};
    totalSelected = 0;

    let cookies = products.filter(p => p.category=="Cookies");

    let html = "";

    cookies.forEach(cookie=>{

        html += `
        <div class="cookie-item">

            <span>${cookie.name}</span>

            <div class="qty">

                <button onclick="changeQty('${cookie.name}',${cookie.id},-1)">-</button>

                <span id="qty${cookie.id}">0</span>

                <button onclick="changeQty('${cookie.name}',${cookie.id},1)">+</button>

            </div>

        </div>
        `;

    });

    document.getElementById("cookieOptions").innerHTML = html;

    updateSelectedCount();

    document.getElementById("cookieBoxModal").style.display = "flex";

}

function closeCookieBox(){

    document.getElementById("cookieBoxModal").style.display="none";

}

function changeQty(name,id,change){

    let limit = 4;

    if(selectedBox.id==11) limit=6;

    if(selectedBox.id==12) limit=8;

    if(!selectedCookies[name])

        selectedCookies[name]=0;

    if(change==1){

        if(totalSelected>=limit) return;

        selectedCookies[name]++;

        totalSelected++;

    }

    else{

        if(selectedCookies[name]>0){

            selectedCookies[name]--;

            totalSelected--;

        }

    }

    document.getElementById("qty"+id).innerHTML =
    selectedCookies[name];

    updateSelectedCount();

}

function updateSelectedCount(){

    let limit=4;

    if(selectedBox.id==11) limit=6;

    if(selectedBox.id==12) limit=8;

    let counter=document.getElementById("selectedCount");

    counter.innerHTML=
    totalSelected+" / "+limit+" Selected";

    let plusButtons = document.querySelectorAll("#cookieOptions .qty button:last-child");

plusButtons.forEach(button => {

    if(totalSelected >= limit){

        button.disabled = true;

    }

    else{

        button.disabled = false;

    }

});

    if(totalSelected==limit){

        counter.style.color="green";

    }

    else{

        counter.style.color="#6B3E26";

    }

}

function saveCookieBox(){

    let limit=4;

    if(selectedBox.id==11) limit=6;

    if(selectedBox.id==12) limit=8;

    if(totalSelected!=limit){

        alert("Please select exactly "+limit+" cookies.");

        return;

    }

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({

        ...selectedBox,

        selectedCookies

    });

    localStorage.setItem("cart",
    JSON.stringify(cart));

    updateCartCount();

    closeCookieBox();

    showToast("Cookie Box added!");

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

let productQty = {};

function changeProductQty(id,change){

    if(!productQty[id])

        productQty[id]=1;

    productQty[id]+=change;

    if(productQty[id]<1)

        productQty[id]=1;

    document.getElementById("productQty"+id).innerHTML=

    productQty[id];

}
function showToast(message){

    let toast=document.getElementById("toast");

    toast.innerHTML="✅ "+message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}
// LOAD PAGE

document.addEventListener("DOMContentLoaded",()=>{

    displayProducts();

    updateCartCount();

});