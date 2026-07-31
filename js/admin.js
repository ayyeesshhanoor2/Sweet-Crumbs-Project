/*====================================
        ADMIN PANEL
====================================*/

let products = JSON.parse(localStorage.getItem("products")) || [];

let users = JSON.parse(localStorage.getItem("users")) || [];

let orders = JSON.parse(localStorage.getItem("orders")) || [];

/*==============================
        SAVE PRODUCTS
==============================*/

function saveProducts(){

    localStorage.setItem("products", JSON.stringify(products));

}

/*==============================
        DASHBOARD
==============================*/

function updateDashboard(){

    document.getElementById("totalProducts").innerText = products.length;

    document.getElementById("totalUsers").innerText = users.length;

    document.getElementById("totalOrders").innerText = orders.length;

    let revenue = 0;

    orders.forEach(order=>{

        revenue += order.total || 0;

    });

    document.getElementById("totalRevenue").innerText =
    "$" + revenue.toFixed(2);

}

/*==============================
        DISPLAY PRODUCTS
==============================*/

function displayProducts(){

    const table = document.getElementById("productTable");

    table.innerHTML = "";

    products.forEach((product,index)=>{

        table.innerHTML += `

        <tr>

            <td>${product.id}</td>

            <td>${product.name}</td>

            <td>${product.category}</td>

            <td>$${product.price.toFixed(2)}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editProduct(${index})">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteProduct(${index})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

/*==============================
        ADD PRODUCT
==============================*/

document.getElementById("productForm").addEventListener("submit",function(e){

    e.preventDefault();

    let product={

        id:Date.now(),

        name:document.getElementById("productName").value,

        price:parseFloat(document.getElementById("productPrice").value),

        category:document.getElementById("productCategory").value,

        image:document.getElementById("productImage").value,

        description:document.getElementById("productDescription").value,

        featured:false,

        sweetness:5

    };

    products.push(product);

    saveProducts();

    displayProducts();

    updateDashboard();

    this.reset();

    alert("Product Added Successfully!");

});

/*==============================
        DELETE PRODUCT
==============================*/

function deleteProduct(index){

    if(confirm("Delete this product?")){

        products.splice(index,1);

        saveProducts();

        displayProducts();

        updateDashboard();

    }

}

/*==============================
        EDIT PRODUCT
==============================*/

function editProduct(index){

    let product = products[index];

    document.getElementById("productName").value = product.name;

    document.getElementById("productPrice").value = product.price;

    document.getElementById("productCategory").value = product.category;

    document.getElementById("productImage").value = product.image;

    document.getElementById("productDescription").value = product.description;

    products.splice(index,1);

    saveProducts();

    displayProducts();

    updateDashboard();

}

/*==============================
        INITIALIZE
==============================*/

displayProducts();

updateDashboard();