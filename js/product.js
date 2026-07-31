/*====================================
        SWEET CRUMBS PRODUCTS
====================================*/

// Default products

let defaultProducts = [

{
    id: 1,
    name: "Classic Chocolate Chip Cookie",
    category: "Cookie",
    price: 4.99,
    image: "images/chocolate-chip.jpg",
    description: "Freshly baked chocolate chip cookie made with premium Belgian chocolate.",
    featured: true,
    sweetness: 5
},

{
    id: 2,
    name: "Lotus Biscoff Cookie",
    category: "Cookie",
    price: 5.99,
    image: "images/biscoff.jpg",
    description: "Soft cookie filled with Lotus Biscoff spread and crunchy biscuit pieces.",
    featured: true,
    sweetness: 5
},

{
    id: 3,
    name: "Red Velvet Cookie",
    category: "Cookie",
    price: 5.49,
    image: "images/red-velvet.jpg",
    description: "Red velvet cookie with creamy white chocolate chunks.",
    featured: true,
    sweetness: 4
},

{
    id: 4,
    name: "Double Chocolate Brownie",
    category: "Brownie",
    price: 6.49,
    image: "images/brownie.jpg",
    description: "Rich fudgy brownie with double Belgian chocolate.",
    featured: true,
    sweetness: 5
},

{
    id: 5,
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 6.99,
    image: "images/caramel-brownie.jpg",
    description: "Chocolate brownie topped with salted caramel drizzle.",
    featured: false,
    sweetness: 4
},

{
    id: 6,
    name: "Nutella Stuffed Cookie",
    category: "Cookie",
    price: 6.99,
    image: "images/nutella-cookie.jpg",
    description: "Warm cookie stuffed with creamy Nutella filling.",
    featured: true,
    sweetness: 5
},

{
    id: 7,
    name: "Oreo Brownie",
    category: "Brownie",
    price: 6.49,
    image: "images/oreo-brownie.jpg",
    description: "Chocolate brownie loaded with Oreo cookie pieces.",
    featured: false,
    sweetness: 5
},

{
    id: 8,
    name: "White Chocolate Macadamia Cookie",
    category: "Cookie",
    price: 5.79,
    image: "images/macadamia.jpg",
    description: "Buttery cookie with white chocolate and crunchy macadamia nuts.",
    featured: false,
    sweetness: 4
}

];


/*====================================
    INITIALIZE LOCAL STORAGE
====================================*/

if(localStorage.getItem("products") === null){

    localStorage.setItem(
        "products",
        JSON.stringify(defaultProducts)
    );

}


/*====================================
        GET PRODUCTS
====================================*/

function getProducts(){

    return JSON.parse(localStorage.getItem("products")) || [];

}


/*====================================
        SAVE PRODUCTS
====================================*/

function saveProducts(products){

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}