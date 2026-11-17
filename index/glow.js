// ========================================
// GLOW LAB
// Home Page JavaScript
// ========================================


// ========================================
// 1. GET IMPORTANT ELEMENTS
// ========================================

const shopButton =
    document.getElementById("shop-btn");

const searchInput =
    document.getElementById("productSearch");

const sortSelect =
    document.getElementById("productSort");

const productCards =
    document.querySelectorAll(".product-card");

const categoryButtons =
    document.querySelectorAll(".category-item");

const productSections =
    document.querySelectorAll(".product-section");

const emptyState =
    document.getElementById("emptyState");

const heartButtons =
    document.querySelectorAll(".heart-btn");

const addButtons =
    document.querySelectorAll(".add-btn");


// ========================================
// 2. STATE
// ========================================

let selectedCategory = "all";


// ========================================
// 3. SHOP NOW BUTTON
// ========================================

shopButton.addEventListener(
    "click",
    function () {

        const bestSellerSection =
            document.getElementById(
                "Best-seller"
            );


        bestSellerSection.scrollIntoView({

            behavior: "smooth"

        });

    }
);


// ========================================
// 4. GET PRODUCT DATA FROM CARD
// ========================================

function getProductFromCard(card) {

    return {

        id:
            card.dataset.id,

        name:
            card
                .querySelector("h3")
                .textContent
                .trim(),

        price:
            Number(
                card.dataset.price
            ),

        category:
            card.dataset.category,

        image:
            card
                .querySelector("img")
                .getAttribute("src")

    };

}


// ========================================
// 5. WISHLIST
// ========================================

heartButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                const card =
                    button.closest(
                        ".product-card"
                    );


                const product =
                    getProductFromCard(card);


                let wishlist =
                    getWishlist();


                const existingProduct =
                    wishlist.find(
                        function (item) {

                            return item.id ===
                                product.id;

                        }
                    );


                const heartIcon =
                    button.querySelector("i");


                if (existingProduct) {

                    wishlist =
                        wishlist.filter(
                            function (item) {

                                return item.id !==
                                    product.id;

                            }
                        );


                    button.classList.remove(
                        "active"
                    );


                    heartIcon.classList.remove(
                        "fa-solid"
                    );

                    heartIcon.classList.add(
                        "fa-regular"
                    );


                    showToast(
                        "Removed from wishlist"
                    );

                }

                else {

                    wishlist.push(
                        product
                    );


                    button.classList.add(
                        "active"
                    );


                    heartIcon.classList.remove(
                        "fa-regular"
                    );

                    heartIcon.classList.add(
                        "fa-solid"
                    );


                    showToast(
                        "Added to your wishlist ♡"
                    );

                }


                saveWishlist(
                    wishlist
                );

            }
        );

    }
);


// ========================================
// 6. RESTORE WISHLIST HEARTS
// ========================================

function syncWishlistButtons() {

    const wishlist =
        getWishlist();


    heartButtons.forEach(
        function (button) {

            const card =
                button.closest(
                    ".product-card"
                );


            const productId =
                card.dataset.id;


            const isSaved =
                wishlist.some(
                    function (item) {

                        return item.id ===
                            productId;

                    }
                );


            const heartIcon =
                button.querySelector("i");


            if (isSaved) {

                button.classList.add(
                    "active"
                );

                heartIcon.classList.remove(
                    "fa-regular"
                );

                heartIcon.classList.add(
                    "fa-solid"
                );

            }

            else {

                button.classList.remove(
                    "active"
                );

                heartIcon.classList.remove(
                    "fa-solid"
                );

                heartIcon.classList.add(
                    "fa-regular"
                );

            }

        }
    );

}


// ========================================
// 7. ADD TO BAG
// ========================================

addButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                const card =
                    button.closest(
                        ".product-card"
                    );


                const product =
                    getProductFromCard(card);


                const cart =
                    getCart();


                const existingProduct =
                    cart.find(
                        function (item) {

                            return item.id ===
                                product.id;

                        }
                    );


                if (existingProduct) {

                    existingProduct.quantity =
                        (existingProduct.quantity || 1)
                        + 1;

                }

                else {

                    cart.push({

                        ...product,

                        quantity: 1

                    });

                }


                saveCart(
                    cart
                );


                showToast(
                    product.name +
                    " added to your bag"
                );

            }
        );

    }
);


// ========================================
// 8. SEARCH PRODUCTS
// ========================================

searchInput.addEventListener(
    "input",
    function () {

        filterProducts();

    }
);


// ========================================
// 9. CATEGORY FILTER
// ========================================

categoryButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                selectedCategory =
                    button.dataset.filter;


                categoryButtons.forEach(
                    function (categoryButton) {

                        categoryButton
                            .classList
                            .remove("active");

                    }
                );


                button
                    .classList
                    .add("active");


                filterProducts();

            }
        );

    }
);


// ========================================
// 10. FILTER PRODUCTS
// ========================================

function filterProducts() {

    const searchValue =
        searchInput
            .value
            .trim()
            .toLowerCase();


    let visibleProducts = 0;


    productCards.forEach(
        function (card) {

            const productName =
                card
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();


            const category =
                card.dataset.category;


            const collection =
                card.dataset.collection;


            // SEARCH CHECK

            const matchesSearch =
                productName.includes(
                    searchValue
                );


            // CATEGORY CHECK

            let matchesCategory = false;


            if (
                selectedCategory === "all"
            ) {

                matchesCategory = true;

            }

            else if (
                selectedCategory === "new"
            ) {

                matchesCategory =
                    collection === "new";

            }

            else if (
                selectedCategory === "sale"
            ) {

                matchesCategory =
                    card.dataset.sale ===
                    "true";

            }

            else {

                matchesCategory =
                    category ===
                    selectedCategory;

            }


            // FINAL RESULT

            if (
                matchesSearch &&
                matchesCategory
            ) {

                card.classList.remove(
                    "hidden"
                );

                visibleProducts++;

            }

            else {

                card.classList.add(
                    "hidden"
                );

            }

        }
    );


    updateSectionVisibility();


    if (visibleProducts === 0) {

        emptyState.classList.remove(
            "hidden"
        );

    }

    else {

        emptyState.classList.add(
            "hidden"
        );

    }

}


// ========================================
// 11. HIDE EMPTY SECTIONS
// ========================================

function updateSectionVisibility() {

    productSections.forEach(
        function (section) {

            const cards =
                section.querySelectorAll(
                    ".product-card"
                );


            let hasVisibleProduct =
                false;


            cards.forEach(
                function (card) {

                    if (
                        !card.classList.contains(
                            "hidden"
                        )
                    ) {

                        hasVisibleProduct =
                            true;

                    }

                }
            );


            if (hasVisibleProduct) {

                section.classList.remove(
                    "hidden"
                );

            }

            else {

                section.classList.add(
                    "hidden"
                );

            }

        }
    );

}


// ========================================
// 12. SORT PRODUCTS
// ========================================

sortSelect.addEventListener(
    "change",
    function () {

        const selectedSort =
            sortSelect.value;


        productSections.forEach(
            function (section) {

                const grid =
                    section.querySelector(
                        ".product-grid"
                    );


                const cards =
                    Array.from(
                        grid.querySelectorAll(
                            ".product-card"
                        )
                    );


                cards.sort(
                    function (a, b) {

                        const priceA =
                            Number(
                                a.dataset.price
                            );

                        const priceB =
                            Number(
                                b.dataset.price
                            );


                        const orderA =
                            Number(
                                a.dataset.order
                            );

                        const orderB =
                            Number(
                                b.dataset.order
                            );


                        // PRICE LOW → HIGH

                        if (
                            selectedSort ===
                            "price-low"
                        ) {

                            return (
                                priceA -
                                priceB
                            );

                        }


                        // PRICE HIGH → LOW

                        if (
                            selectedSort ===
                            "price-high"
                        ) {

                            return (
                                priceB -
                                priceA
                            );

                        }


                        // NEWEST

                        if (
                            selectedSort ===
                            "newest"
                        ) {

                            return (
                                orderB -
                                orderA
                            );

                        }


                        // BEST SELLERS

                        if (
                            selectedSort ===
                            "best"
                        ) {

                            const bestA =
                                a.dataset
                                    .bestseller ===
                                "true"
                                    ? 1
                                    : 0;


                            const bestB =
                                b.dataset
                                    .bestseller ===
                                "true"
                                    ? 1
                                    : 0;


                            return (
                                bestB -
                                bestA
                            );

                        }


                        // FEATURED / ORIGINAL

                        return (
                            orderA -
                            orderB
                        );

                    }
                );


                cards.forEach(
                    function (card) {

                        grid.appendChild(
                            card
                        );

                    }
                );

            }
        );

    }
);


// ========================================
// 13. START
// ========================================

syncWishlistButtons();

// ========================================
// 14. OPEN PRODUCT DETAILS
// ========================================

productCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function (event) {

                const actionButton =
                    event.target.closest(
                        ".heart-btn, .add-btn"
                    );


                if (actionButton) {
                    return;
                }


                const productId =
                    card.dataset.id;


                if (!productId) {
                    return;
                }


                window.location.href =
                    "../product/product.html?id=" +
                    productId;

            }
        );

    }
);

