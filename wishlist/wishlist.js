/* ============================================
   ELEMENTS
============================================ */

const wishlistGrid =
    document.getElementById("wishlistGrid");


const wishlistEmpty =
    document.getElementById("wishlistEmpty");



/* ============================================
   RENDER WISHLIST
============================================ */

function renderWishlist() {


    const wishlist =
        getWishlist();


    wishlistGrid.innerHTML = "";


    if (wishlist.length === 0) {

        wishlistEmpty.classList.add("show");

        return;

    }


    wishlistEmpty.classList.remove("show");



    wishlist.forEach(function (product) {


        const card =
            document.createElement("article");


        card.className =
            "wishlist-card";


        card.innerHTML = `

            <div class="wishlist-image">

                <img
                    src="${product.image}"
                    alt="${product.name}">

            </div>


            <div class="wishlist-info">

                <p class="wishlist-category">

                    ${product.category}

                </p>


                <h3>

                    ${product.name}

                </h3>


                <p class="wishlist-price">

                    ${product.price} JD

                </p>


                <div class="wishlist-actions">


                    <button
                        class="add-cart-button"
                        data-id="${product.id}">

                        <i class="fa-solid fa-bag-shopping"></i>

                        Add to Bag

                    </button>


                    <button
                        class="remove-button"
                        data-id="${product.id}"
                        aria-label="Remove from wishlist">

                        <i class="fa-solid fa-trash"></i>

                    </button>


                </div>


            </div>

        `;


        wishlistGrid.appendChild(card);

    });


    addWishlistEvents();

}



/* ============================================
   EVENTS
============================================ */

function addWishlistEvents() {


    const removeButtons =
        document.querySelectorAll(
            ".remove-button"
        );


    const cartButtons =
        document.querySelectorAll(
            ".add-cart-button"
        );



    /* REMOVE */

    removeButtons.forEach(function (button) {


        button.addEventListener(
            "click",
            function () {


                const productId =
                    button.dataset.id;


                let wishlist =
                    getWishlist();


                wishlist =
                    wishlist.filter(
                        function (product) {

                            return product.id !==
                                productId;

                        }
                    );


                saveWishlist(wishlist);


                showToast(
                    "Product removed from wishlist"
                );


                renderWishlist();


            }
        );


    });



    /* ADD TO CART */

    cartButtons.forEach(function (button) {


        button.addEventListener(
            "click",
            function () {


                const productId =
                    button.dataset.id;


                const wishlist =
                    getWishlist();


                const product =
                    wishlist.find(
                        function (item) {

                            return item.id ===
                                productId;

                        }
                    );


                if (!product) {
                    return;
                }


                const cart =
                    getCart();


                const existingProduct =
                    cart.find(
                        function (item) {

                            return item.id ===
                                productId;

                        }
                    );


                if (existingProduct) {

                    existingProduct.quantity =
                        (existingProduct.quantity || 1)
                        + 1;

                } else {

                    cart.push({
                        ...product,
                        quantity: 1
                    });

                }


                saveCart(cart);


                showToast(
                    "Product added to bag"
                );


            }
        );


    });


}



/* ============================================
   START
============================================ */

renderWishlist();