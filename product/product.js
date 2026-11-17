// ========================================
// GLOW LAB
// Product Details JavaScript
// ========================================


// ========================================
// 1. PRODUCTS DATA
// ========================================

const products = [

    {
        id: "p1",
        name:
            "Maybelline Lash Sensational Sky High",
        price: 11,
        category: "Makeup",
        image:
            "../images/maybellene mescara.jpeg",
        badge:
            "Best Seller",
        description:
            "A lengthening mascara designed to give lashes a lifted, defined and lightweight look for your everyday beauty routine."
    },

    {
        id: "p2",
        name:
            "Cetaphil Sheer Mineral Sunscreen SPF 50",
        price: 2,
        category: "Skin Care",
        image:
            "../images/Sheer Mineral .jpg",
        badge:
            "Best Seller",
        description:
            "A lightweight mineral sunscreen with SPF 50 that helps protect the skin while fitting easily into your daily skincare routine."
    },

    {
        id: "p3",
        name:
            "CeraVe Foaming Facial Cleanser",
        price: 11,
        category: "Skin Care",
        image:
            "../images/cerave foaming facial cleanser.jpeg",
        badge:
            "Best Seller",
        description:
            "A gentle foaming facial cleanser created to remove excess oil, dirt and makeup while keeping your skincare routine simple."
    },

    {
        id: "p4",
        name:
            "Niacinamide 10% + Zinc 1%",
        price: 4.2,
        category: "Skin Care",
        image:
            "../images/niaseamide.jpeg",
        badge:
            "Best Seller",
        description:
            "A lightweight serum featuring niacinamide and zinc, ideal for a simple everyday skincare routine and a fresh-looking complexion."
    },

    {
        id: "p5",
        name:
            "Shea Butter Moisturizing Curl Activator Cream",
        price: 10,
        category: "Hair Care",
        image:
            "../images/Moisturizing Curl Activator Cream.jpg",
        badge:
            "New",
        description:
            "A moisturizing curl activator cream designed to help define curls and leave hair looking soft, styled and refreshed."
    },

    {
        id: "p6",
        name:
            "Golden Rose Eyebrow Pencil",
        price: 2,
        category: "Makeup",
        image:
            "../images/golden rose eyebrow pencil.jpeg",
        badge:
            "New",
        description:
            "An easy-to-use eyebrow pencil for defining, shaping and filling the brows with a natural everyday makeup finish."
    },

    {
        id: "p7",
        name:
            "NYX Butter Melt Blush",
        price: 7.7,
        category: "Makeup",
        image:
            "../images/buttermeltnyx.jpg",
        badge:
            "New",
        description:
            "A soft blush made to add a smooth wash of color to your makeup look with an easy-to-blend finish."
    },

    {
        id: "p8",
        name:
            "Essence Hello Good Stuff Glow Serum Primer",
        price: 4.2,
        category: "Makeup",
        image:
            "../images/glow serum primer.jpg",
        badge:
            "New",
        description:
            "A glow serum primer designed to prepare the skin for makeup while adding a fresh and luminous-looking finish."
    }

];


// ========================================
// 2. GET ELEMENTS
// ========================================

const productDetails =
    document.getElementById(
        "productDetails"
    );

const productNotFound =
    document.getElementById(
        "productNotFound"
    );

const productImage =
    document.getElementById(
        "productImage"
    );

const productCategory =
    document.getElementById(
        "productCategory"
    );

const productName =
    document.getElementById(
        "productName"
    );

const productPrice =
    document.getElementById(
        "productPrice"
    );

const productDescription =
    document.getElementById(
        "productDescription"
    );

const productBadge =
    document.getElementById(
        "productBadge"
    );

const addToCartButton =
    document.getElementById(
        "addToCartButton"
    );

const wishlistButton =
    document.getElementById(
        "wishlistButton"
    );


// ========================================
// 3. GET PRODUCT ID FROM URL
// ========================================

const urlParameters =
    new URLSearchParams(
        window.location.search
    );


const productId =
    urlParameters.get("id");


// ========================================
// 4. FIND PRODUCT
// ========================================

const selectedProduct =
    products.find(
        function (product) {

            return product.id ===
                productId;

        }
    );


// ========================================
// 5. SHOW PRODUCT
// ========================================

function renderProduct() {

    if (!selectedProduct) {

        productDetails.style.display =
            "none";

        productNotFound.classList.add(
            "show"
        );

        return;

    }


    productImage.src =
        selectedProduct.image;

    productImage.alt =
        selectedProduct.name;


    productCategory.textContent =
        selectedProduct.category;


    productName.textContent =
        selectedProduct.name;


    productPrice.textContent =
        selectedProduct.price
            .toFixed(2) +
        " JD";


    productDescription.textContent =
        selectedProduct.description;


    if (selectedProduct.badge) {

        productBadge.textContent =
            selectedProduct.badge;

        productBadge.classList.add(
            "show"
        );

    }


    syncWishlistButton();

}


// ========================================
// 6. ADD TO CART
// ========================================

addToCartButton.addEventListener(
    "click",
    function () {

        if (!selectedProduct) {
            return;
        }


        const cart =
            getCart();


        const existingProduct =
            cart.find(
                function (item) {

                    return item.id ===
                        selectedProduct.id;

                }
            );


        if (existingProduct) {

            existingProduct.quantity =
                (existingProduct.quantity || 1)
                + 1;

        }

        else {

            cart.push({

                id:
                    selectedProduct.id,

                name:
                    selectedProduct.name,

                price:
                    selectedProduct.price,

                category:
                    selectedProduct.category,

                image:
                    selectedProduct.image,

                quantity: 1

            });

        }


        saveCart(cart);


        showToast(
            selectedProduct.name +
            " added to your bag"
        );

    }
);


// ========================================
// 7. WISHLIST
// ========================================

wishlistButton.addEventListener(
    "click",
    function () {

        if (!selectedProduct) {
            return;
        }


        let wishlist =
            getWishlist();


        const existingProduct =
            wishlist.find(
                function (item) {

                    return item.id ===
                        selectedProduct.id;

                }
            );


        if (existingProduct) {

            wishlist =
                wishlist.filter(
                    function (item) {

                        return item.id !==
                            selectedProduct.id;

                    }
                );


            showToast(
                "Removed from wishlist"
            );

        }

        else {

            wishlist.push({

                id:
                    selectedProduct.id,

                name:
                    selectedProduct.name,

                price:
                    selectedProduct.price,

                category:
                    selectedProduct.category,

                image:
                    selectedProduct.image

            });


            showToast(
                "Added to your wishlist ♡"
            );

        }


        saveWishlist(wishlist);

        syncWishlistButton();

    }
);


// ========================================
// 8. SYNC WISHLIST BUTTON
// ========================================

function syncWishlistButton() {

    if (!selectedProduct) {
        return;
    }


    const wishlist =
        getWishlist();


    const isSaved =
        wishlist.some(
            function (item) {

                return item.id ===
                    selectedProduct.id;

            }
        );


    const icon =
        wishlistButton.querySelector("i");


    if (isSaved) {

        wishlistButton.classList.add(
            "active"
        );

        icon.classList.remove(
            "fa-regular"
        );

        icon.classList.add(
            "fa-solid"
        );

    }

    else {

        wishlistButton.classList.remove(
            "active"
        );

        icon.classList.remove(
            "fa-solid"
        );

        icon.classList.add(
            "fa-regular"
        );

    }

}


// ========================================
// START
// ========================================

renderProduct();
