/* =========================================
   GLOW LAB - SHARED JAVASCRIPT
========================================= */


/* =========================================
   1. HEADER
========================================= */

const headerHTML = `

<header class="header" id="mainHeader">


    <!-- BRAND -->

    <a
        href="../index/glow.html"
        class="brand">


        <img
            src="../images/GLlogo.png"
            alt="Glow Lab Logo"
            class="brand-logo">


        <div class="brand-text">

            <span class="logo">
                Glow Lab
            </span>

            <span class="slogan">
                Discover your glow
            </span>

        </div>

    </a>



    <!-- NAVIGATION -->

    <nav
        class="main-nav"
        id="mainNav">


        <a href="../index/glow.html#home">
            Home
        </a>


        <a href="../index/glow.html#Categories">
            Categories
        </a>


        <a href="../index/glow.html#Best-seller">
            Best Sellers
        </a>


        <a href="../index/glow.html#New-arrival">
            New Arrivals
        </a>

    </nav>



    <!-- ACTIONS -->

    <div class="header-actions">


        <!-- LOGIN -->

        <a
            href="../login/login.html"
            class="icon-btn"
            title="Login"
            aria-label="Login">

            <i class="fa-regular fa-user"></i>

        </a>



        <!-- WISHLIST -->

        <a
            href="../wishlist/wishlist.html"
            class="icon-btn"
            title="Wishlist"
            aria-label="Wishlist">


            <i class="fa-regular fa-heart"></i>


            <span
                class="counter"
                id="wishlistCount">

                0

            </span>

        </a>



        <!-- CART -->

        <a
            href="../cart/cart.html"
            class="icon-btn"
            title="Shopping Bag"
            aria-label="Shopping Bag">


            <i class="fa-solid fa-bag-shopping"></i>


            <span
                class="counter"
                id="cartCount">

                0

            </span>

        </a>



        <!-- MOBILE MENU -->

        <button
            type="button"
            class="icon-btn menu-button"
            id="menuButton"
            aria-label="Open menu">


            <i class="fa-solid fa-bars"></i>


        </button>


    </div>


</header>

`;



/* =========================================
   2. FOOTER
========================================= */

const footerHTML = `

<footer class="footer">


    <div class="footer-content">


        <!-- BRAND -->

        <div class="footer-brand">

            <h2>
                Glow Lab
            </h2>

            <p>
                Beauty essentials made for
                your everyday glow.
            </p>

        </div>



        <!-- EXPLORE -->

        <div class="footer-section">

            <h3>
                Explore
            </h3>

            <a href="../index/glow.html#home">
                Home
            </a>

            <a href="../index/glow.html#Categories">
                Categories
            </a>

            <a href="../index/glow.html#Best-seller">
                Best Sellers
            </a>

            <a href="../index/glow.html#New-arrival">
                New Arrivals
            </a>

        </div>



        <!-- CONTACT -->

        <div class="footer-section">

            <h3>
                Contact
            </h3>

            <p>
                <i class="fa-regular fa-envelope"></i>

                glowlab@gmail.com
            </p>


            <p>
                <i class="fa-solid fa-phone"></i>

                +962 7X XXX XXXX
            </p>

        </div>



        <!-- SOCIAL -->

        <div class="footer-section">

            <h3>
                Follow Us
            </h3>


            <div class="social-icons">


                <a
                    href="#"
                    aria-label="Instagram">

                    <i class="fa-brands fa-instagram"></i>

                </a>


                <a
                    href="#"
                    aria-label="Facebook">

                    <i class="fa-brands fa-facebook-f"></i>

                </a>


                <a
                    href="#"
                    aria-label="TikTok">

                    <i class="fa-brands fa-tiktok"></i>

                </a>


            </div>

        </div>


    </div>



    <div class="footer-bottom">

        <p>
            © 2026 Glow Lab.
            All rights reserved.
        </p>

    </div>


</footer>

`;



/* =========================================
   3. CART STORAGE
========================================= */

function getCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateHeaderCounters();

}



/* =========================================
   4. WISHLIST STORAGE
========================================= */

function getWishlist() {

    return JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

}


function saveWishlist(wishlist) {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    updateHeaderCounters();

}



/* =========================================
   5. HEADER COUNTERS
========================================= */

function updateHeaderCounters() {


    const wishlistCount =
        document.getElementById(
            "wishlistCount"
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    const wishlist =
        getWishlist();


    const cart =
        getCart();



    if (wishlistCount) {

        wishlistCount.textContent =
            wishlist.length;

    }



    if (cartCount) {


        const totalQuantity =
            cart.reduce(
                (total, item) =>
                    total + (item.quantity || 1),
                0
            );


        cartCount.textContent =
            totalQuantity;

    }

}



/* =========================================
   6. TOAST
========================================= */

function createToast() {


    const toast =
        document.createElement("div");


    toast.className =
        "toast";


    toast.id =
        "sharedToast";


    toast.innerHTML = `

        <div class="toast-icon">

            <i class="fa-solid fa-check"></i>

        </div>


        <span id="sharedToastMessage">

            Done

        </span>

    `;


    document.body.appendChild(toast);

}



/* =========================================
   SHOW TOAST
========================================= */

function showToast(message) {


    const toast =
        document.getElementById(
            "sharedToast"
        );


    const toastMessage =
        document.getElementById(
            "sharedToastMessage"
        );


    if (!toast || !toastMessage) {
        return;
    }


    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(function () {

        toast.classList.remove(
            "show"
        );

    }, 2500);

}



/* =========================================
   7. MOBILE MENU
========================================= */

function initializeMobileMenu() {


    const menuButton =
        document.getElementById(
            "menuButton"
        );


    const mainNav =
        document.getElementById(
            "mainNav"
        );


    if (!menuButton || !mainNav) {
        return;
    }


    menuButton.addEventListener(
        "click",
        function () {

            mainNav.classList.toggle(
                "open"
            );

        }
    );

}



/* =========================================
   8. LOAD SHARED COMPONENTS
========================================= */

function loadSharedComponents() {


    /* HEADER */

    const headerContainer =
        document.getElementById(
            "site-header"
        );


    if (headerContainer) {

        headerContainer.innerHTML =
            headerHTML;

    }



    /* FOOTER */

    const footerContainer =
        document.getElementById(
            "site-footer"
        );


    if (footerContainer) {

        footerContainer.innerHTML =
            footerHTML;

    }



    /* TOAST */

    createToast();



    /* COUNTERS */

    updateHeaderCounters();



    /* MOBILE */

    initializeMobileMenu();

}



/* =========================================
   START
========================================= */

loadSharedComponents();