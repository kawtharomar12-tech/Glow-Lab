# Glow Lab

Glow Lab is a responsive cosmetics e-commerce front-end project built with **HTML, CSS, and Vanilla JavaScript**. It demonstrates a complete shopping flow with reusable shared components, product filtering, wishlist and cart persistence, product details, promo codes, and a modal checkout experience.

## Features

- Responsive home page for desktop, tablet, and mobile
- Product search, sorting, and category filtering
- Best Sellers and New Arrivals sections
- Wishlist with persistent `localStorage` data
- Shopping cart with quantity controls and automatic totals
- Persistent cart and wishlist counters in the shared header
- Dynamic product details page using product IDs in the query string
- Login and registration UI
- Shared header, footer, toast notifications, and mobile navigation
- Checkout modal with customer and delivery information
- Promo/discount code support
- Order confirmation flow
- Empty states for cart, wishlist, and search results

## Demo Promo Codes

| Code | Discount |
| --- | --- |
| `GLOW10` | 10% off |
| `BEAUTY15` | 15% off |
| `WELCOME5` | 5 JD off |

> These promo codes and the checkout flow are front-end demonstrations only. No real payment or server-side order processing is performed.

## Technologies

- HTML5
- CSS3
- JavaScript (ES6+)
- Local Storage
- Font Awesome
- Responsive Design / Media Queries

## Project Structure

```text
GLOWLAB/
├── index.html
├── images/
├── index/
│   ├── glow.html
│   ├── glow.css
│   └── glow.js
├── login/
├── register/
├── wishlist/
├── cart/
├── product/
└── shared/
    ├── shared.css
    └── shared.js
```

## Run Locally

For the best experience, run the project through a local web server instead of opening the HTML files directly.

Using VS Code:

1. Open the `GLOWLAB` folder.
2. Install the **Live Server** extension if needed.
3. Open `index.html`.
4. Choose **Open with Live Server**.

## GitHub Pages

The root `index.html` redirects to the main Glow Lab page, so the project can be published directly with GitHub Pages.

After uploading the repository:

1. Open **Settings** → **Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the `main` branch and `/ (root)` folder.
4. Save.

GitHub will provide the public website URL after deployment.

## Notes

- Cart and wishlist data are stored in the browser using `localStorage`.
- Authentication screens are UI demonstrations and are not connected to a backend.
- Checkout is a front-end demo using Cash on Delivery and does not process real payments.

## Author

Frontend portfolio project created as part of hands-on HTML, CSS, and JavaScript practice.
