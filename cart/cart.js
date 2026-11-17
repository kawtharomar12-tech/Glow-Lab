// ========================================
// GLOW LAB
// Cart Page JavaScript
// ========================================


// ========================================
// 1. GET ELEMENTS
// ========================================

const cartItems =
    document.getElementById("cartItems");

const cartEmpty =
    document.getElementById("cartEmpty");

const cartLayout =
    document.getElementById("cartLayout");

const subtotalElement =
    document.getElementById("subtotal");

const totalElement =
    document.getElementById("total");

const checkoutButton =
    document.getElementById("checkoutButton");


// ========================================
// 2. RENDER CART
// ========================================

function renderCart() {

    const cart =
        getCart();


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartLayout.style.display =
            "none";

        cartEmpty.classList.add(
            "show"
        );

        return;

    }


    cartLayout.style.display =
        "grid";

    cartEmpty.classList.remove(
        "show"
    );


    cart.forEach(
        function (product) {

            const quantity =
                product.quantity || 1;


            const lineTotal =
                product.price * quantity;


            const item =
                document.createElement(
                    "article"
                );


            item.className =
                "cart-item";


            item.dataset.id =
                product.id;


            item.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                </div>


                <div class="cart-item-info">

                    <p class="cart-item-category">
                        ${product.category}
                    </p>

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="cart-item-price">
                        ${formatPrice(product.price)} JD
                    </p>

                </div>


                <div class="cart-item-controls">


                    <div class="quantity-control">

                        <button
                            type="button"
                            class="quantity-button decrease-button"
                            data-action="decrease"
                            aria-label="Decrease quantity">

                            <i class="fa-solid fa-minus"></i>

                        </button>


                        <span class="quantity-value">
                            ${quantity}
                        </span>


                        <button
                            type="button"
                            class="quantity-button increase-button"
                            data-action="increase"
                            aria-label="Increase quantity">

                            <i class="fa-solid fa-plus"></i>

                        </button>

                    </div>


                    <p class="line-total">
                        ${formatPrice(lineTotal)} JD
                    </p>


                    <button
                        type="button"
                        class="remove-item"
                        data-action="remove">

                        <i class="fa-regular fa-trash-can"></i>

                        Remove

                    </button>

                </div>

            `;


            cartItems.appendChild(
                item
            );

        }
    );


    updateTotals();

}


// ========================================
// 3. FORMAT PRICE
// ========================================

function formatPrice(price) {

    return Number(price)
        .toFixed(2);

}


// ========================================
// 4. UPDATE TOTALS
// ========================================

function updateTotals() {

    const cart =
        getCart();


    const subtotal =
        cart.reduce(
            function (total, product) {

                const quantity =
                    product.quantity || 1;


                return (
                    total +
                    product.price *
                    quantity
                );

            },
            0
        );


    subtotalElement.textContent =
        formatPrice(subtotal) +
        " JD";


    totalElement.textContent =
        formatPrice(subtotal) +
        " JD";

}


// ========================================
// 5. CART ACTIONS
// ========================================

cartItems.addEventListener(
    "click",
    function (event) {

        const actionButton =
            event.target.closest(
                "[data-action]"
            );


        if (!actionButton) {
            return;
        }


        const cartItem =
            actionButton.closest(
                ".cart-item"
            );


        if (!cartItem) {
            return;
        }


        const productId =
            cartItem.dataset.id;


        const action =
            actionButton.dataset.action;


        let cart =
            getCart();


        const product =
            cart.find(
                function (item) {

                    return item.id ===
                        productId;

                }
            );


        if (!product) {
            return;
        }


        // INCREASE

        if (action === "increase") {

            product.quantity =
                (product.quantity || 1)
                + 1;


            saveCart(cart);


            renderCart();


            showToast(
                "Quantity updated"
            );

            return;

        }


        // DECREASE

        if (action === "decrease") {

            const currentQuantity =
                product.quantity || 1;


            if (currentQuantity > 1) {

                product.quantity =
                    currentQuantity - 1;


                saveCart(cart);


                renderCart();


                showToast(
                    "Quantity updated"
                );

            }

            else {

                showToast(
                    "Minimum quantity is 1"
                );

            }


            return;

        }


        // REMOVE

        if (action === "remove") {

            cart =
                cart.filter(
                    function (item) {

                        return item.id !==
                            productId;

                    }
                );


            saveCart(cart);


            renderCart();


            showToast(
                "Product removed from bag"
            );

        }

    }
);


// ========================================
// 6. CHECKOUT MODAL ELEMENTS
// ========================================

const checkoutModal =
    document.getElementById(
        "checkoutModal"
    );

const checkoutOverlay =
    document.getElementById(
        "checkoutOverlay"
    );

const closeCheckoutButton =
    document.getElementById(
        "closeCheckout"
    );

const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );

const checkoutTotal =
    document.getElementById(
        "checkoutTotal"
    );

const checkoutError =
    document.getElementById(
        "checkoutError"
    );


const checkoutDialog =
    document.querySelector(
        ".checkout-dialog"
    );

const checkoutSuccess =
    document.getElementById(
        "checkoutSuccess"
    );

const successOrderNumber =
    document.getElementById(
        "successOrderNumber"
    );

const successOrderTotal =
    document.getElementById(
        "successOrderTotal"
    );

const continueShoppingButton =
    document.getElementById(
        "continueShoppingButton"
    );


const discountCodeInput =
    document.getElementById(
        "discountCode"
    );

const applyDiscountButton =
    document.getElementById(
        "applyDiscountButton"
    );

const promoMessage =
    document.getElementById(
        "promoMessage"
    );

const checkoutDiscount =
    document.getElementById(
        "checkoutDiscount"
    );


// ========================================
// 7. DISCOUNT
// ========================================

const discountCodes = {

    GLOW10: {
        type: "percentage",
        value: 10
    },

    BEAUTY15: {
        type: "percentage",
        value: 15
    },

    WELCOME5: {
        type: "fixed",
        value: 5
    }

};


let activeDiscountCode = null;

let pendingOrderTotal = 0;


function getCartSubtotal() {

    const cart =
        getCart();


    return cart.reduce(
        function (sum, item) {

            return (
                sum +
                item.price *
                (item.quantity || 1)
            );

        },
        0
    );

}


function getDiscountAmount(subtotal) {

    if (!activeDiscountCode) {
        return 0;
    }


    const discount =
        discountCodes[
            activeDiscountCode
        ];


    if (!discount) {
        return 0;
    }


    if (
        discount.type ===
        "percentage"
    ) {

        return (
            subtotal *
            discount.value /
            100
        );

    }


    if (
        discount.type ===
        "fixed"
    ) {

        return Math.min(
            discount.value,
            subtotal
        );

    }


    return 0;

}


function updateCheckoutTotals() {

    const subtotal =
        getCartSubtotal();


    const discountAmount =
        getDiscountAmount(
            subtotal
        );


    const finalTotal =
        Math.max(
            subtotal -
            discountAmount,
            0
        );


    checkoutDiscount.textContent =
        "-" +
        formatPrice(
            discountAmount
        ) +
        " JD";


    pendingOrderTotal =
        finalTotal;


    checkoutTotal.textContent =
        formatPrice(
            finalTotal
        ) +
        " JD";

}


function applyDiscountCode() {

    const code =
        discountCodeInput
            .value
            .trim()
            .toUpperCase();


    promoMessage.classList.remove(
        "success",
        "error"
    );


    if (!code) {

        activeDiscountCode = null;

        promoMessage.textContent =
            "Enter a discount code.";

        promoMessage.classList.add(
            "error"
        );

        updateCheckoutTotals();

        return;

    }


    if (!discountCodes[code]) {

        activeDiscountCode = null;

        promoMessage.textContent =
            "Invalid discount code.";

        promoMessage.classList.add(
            "error"
        );

        updateCheckoutTotals();

        return;

    }


    activeDiscountCode =
        code;


    const discount =
        discountCodes[code];


    if (
        discount.type ===
        "percentage"
    ) {

        promoMessage.textContent =
            discount.value +
            "% discount applied.";

    }

    else {

        promoMessage.textContent =
            formatPrice(
                discount.value
            ) +
            " JD discount applied.";

    }


    promoMessage.classList.add(
        "success"
    );


    updateCheckoutTotals();

}


applyDiscountButton.addEventListener(
    "click",
    applyDiscountCode
);


discountCodeInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            applyDiscountCode();

        }

    }
);


// ========================================
// 8. OPEN / CLOSE CHECKOUT
// ========================================

function openCheckoutModal() {

    checkoutDialog.classList.remove(
        "success-mode"
    );


    checkoutSuccess.classList.remove(
        "show"
    );


    const cart =
        getCart();


    if (cart.length === 0) {

        showToast(
            "Your bag is empty"
        );

        return;

    }


    activeDiscountCode =
        null;


    discountCodeInput.value =
        "";


    promoMessage.textContent =
        "";


    promoMessage.classList.remove(
        "success",
        "error"
    );


    checkoutError.textContent =
        "";


    updateCheckoutTotals();


    checkoutModal.classList.add(
        "show"
    );


    checkoutModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

}


function closeCheckoutModal() {

    checkoutModal.classList.remove(
        "show"
    );


    checkoutModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


checkoutButton.addEventListener(
    "click",
    openCheckoutModal
);


closeCheckoutButton.addEventListener(
    "click",
    closeCheckoutModal
);


checkoutOverlay.addEventListener(
    "click",
    closeCheckoutModal
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            checkoutModal.classList.contains(
                "show"
            )
        ) {

            closeCheckoutModal();

        }

    }
);


// ========================================
// 9. PLACE ORDER
// ========================================

checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (
            !checkoutForm.checkValidity()
        ) {

            checkoutError.textContent =
                "Please complete all required fields.";

            checkoutForm.reportValidity();

            return;

        }


        const cart =
            getCart();


        if (cart.length === 0) {

            checkoutError.textContent =
                "Your bag is empty.";

            return;

        }


        const orderNumber =
            "GL" +
            String(
                Math.floor(
                    1000 +
                    Math.random() * 9000
                )
            );


        successOrderNumber.textContent =
            orderNumber;


        successOrderTotal.textContent =
            formatPrice(
                pendingOrderTotal
            ) +
            " JD";


        checkoutDialog.classList.add(
            "success-mode"
        );


        checkoutSuccess.classList.add(
            "show"
        );

    }
);




continueShoppingButton.addEventListener(
    "click",
    function () {

        saveCart([]);


        checkoutForm.reset();


        activeDiscountCode =
            null;


        closeCheckoutModal();


        renderCart();


        window.location.href =
            "../index/glow.html";

    }
);

// ========================================
// START
// ========================================

renderCart();
