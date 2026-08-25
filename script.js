// =====================================
// BARBIEMART COMPLETE SYSTEM
// =====================================

const COMMISSION_RATE = 0.10;

let cart = [];


// =====================================
// ADD TO CART
// =====================================

function addToCart(name, price) {

    cart.push({
        name: name,
        price: Number(price)
    });

    updateCart();

    alert(name + " added to your cart! 🎀");
}


// =====================================
// UPDATE CART NUMBER
// =====================================

function updateCart() {

    const count = document.getElementById("cartCount");

    if (count) {
        count.textContent = cart.length;
    }
}


// =====================================
// OPEN CART
// =====================================

function openCart() {

    const modal = document.getElementById("cartModal");

    if (modal) {
        modal.style.display = "block";
    }

    displayCart();
}


// =====================================
// CLOSE CART
// =====================================

function closeCart() {

    const modal = document.getElementById("cartModal");

    if (modal) {
        modal.style.display = "none";
    }
}


// =====================================
// DISPLAY CART + TOTAL
// =====================================

function displayCart() {

    const items = document.getElementById("cartItems");

    const totalDisplay = document.getElementById("cartTotal");

    if (!items || !totalDisplay) {
        return;
    }

    items.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        items.innerHTML = "<p>Your cart is empty.</p>";

        totalDisplay.textContent = "0";

        return;
    }


    cart.forEach(function(item, index) {

        total += item.price;


        const row = document.createElement("div");

        row.innerHTML = `
            <p>
                <strong>${item.name}</strong>
                <br>
                UGX ${item.price.toLocaleString()}
            </p>

            <button onclick="removeFromCart(${index})">
                🗑️ Remove
            </button>

            <hr>
        `;

        items.appendChild(row);
    });


    totalDisplay.textContent = total.toLocaleString();
}


// =====================================
// REMOVE FROM CART
// =====================================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

    displayCart();
}


// =====================================
// CHECKOUT
// =====================================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    let total = 0;

    cart.forEach(function(item) {

        total += item.price;

    });


    const commission =
        total * COMMISSION_RATE;


    const sellerAmount =
        total - commission;


    const checkoutSection =
        document.getElementById("checkoutSection");


    const checkoutTotal =
        document.getElementById("checkoutTotal");


    const checkoutSummary =
        document.getElementById("checkoutSummary");


    if (checkoutSection) {

        checkoutSection.style.display = "block";

    }


    if (checkoutTotal) {

        checkoutTotal.textContent =
            total.toLocaleString();

    }


    if (checkoutSummary) {

        checkoutSummary.innerHTML = `

            <h3>Order Summary</h3>

            ${cart.map(item => `
                <p>
                    ${item.name} -
                    UGX ${item.price.toLocaleString()}
                </p>
            `).join("")}

            <hr>

            <p>
                BarbieMart commission:
                UGX ${commission.toLocaleString()}
            </p>

            <p>
                Seller amount:
                UGX ${sellerAmount.toLocaleString()}
            </p>

        `;

    }


    checkoutSection.scrollIntoView({
        behavior: "smooth"
    });
}


// =====================================
// PAYMENT SELECTION
// =====================================

function selectPayment(method) {

    const message =
        document.getElementById("paymentMessage");


    if (message) {

        message.innerHTML = `

            <p>
                You selected:
                <strong>${method}</strong>
            </p>

            <p>
                Payment integration will be connected
                after the checkout system is tested.
            </p>

        `;

    }
}


// =====================================
// SELLER PRODUCT
// =====================================

function calculateCommission(price) {

    const commission =
        Number(price) * COMMISSION_RATE;


    const sellerAmount =
        Number(price) - commission;


    return {
        productPrice: Number(price),
        commission: commission,
        sellerAmount: sellerAmount
    };
}


function addProduct() {

    const name =
        document.getElementById("productName").value;


    const price =
        Number(
            document.getElementById("productPrice").value
        );


    const seller =
        document.getElementById("sellerName").value;


    const message =
        document.getElementById("sellerMessage");


    const productList =
        document.getElementById("productList");


    if (!name || !price || !seller) {

        message.textContent =
            "Please fill in all seller details.";

        return;
    }


    const result =
        calculateCommission(price);


    const product =
        document.createElement("div");


    product.innerHTML = `

        <h3>${name}</h3>

        <p>
            Seller: ${seller}
        </p>

        <p>
            Price:
            UGX ${price.toLocaleString()}
        </p>

        <p>
            BarbieMart commission:
            UGX ${result.commission.toLocaleString()}
        </p>

        <p>
            Seller receives:
            UGX ${result.sellerAmount.toLocaleString()}
        </p>

        <hr>
    `;


    productList.appendChild(product);


    message.textContent =
        "Product added successfully! 🎀";


    document.getElementById("productName").value = "";

    document.getElementById("productPrice").value = "";

    document.getElementById("sellerName").value = "";
}


// =====================================
// SEARCH
// =====================================

function searchProducts() {

    const input =
        document.getElementById("searchInput");


    if (!input) return;


    const search =
        input.value.toLowerCase();


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(function(product) {

        const name =
            product
                .querySelector("h3")
                .textContent
                .toLowerCase();


        if (name.includes(search)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });
}