// app.js

// ========= MENU =========
const openBtn = document.getElementById("openMenuBtn");
const closeBtn = document.getElementById("closeMenuBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

function openMenu() {
    if (!sideMenu) return;
    sideMenu.classList.add("open");
    sideMenu.setAttribute("aria-hidden", "false");
    if (overlay) overlay.hidden = false;
}

function closeMenu() {
    if (!sideMenu) return;
    sideMenu.classList.remove("open");
    sideMenu.setAttribute("aria-hidden", "true");
    if (overlay) overlay.hidden = true;
}

if (openBtn) openBtn.addEventListener("click", openMenu);
if (closeBtn) closeBtn.addEventListener("click", closeMenu);
if (overlay) overlay.addEventListener("click", closeMenu);

// ========= CART =========
const CART_KEY = "textureStudioCart_all";

function loadCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function cartTotals(cart) {
    let total = 0;
    let count = 0;
    for (const item of cart) {
        total += item.price * item.qty;
        count += item.qty;
    }
    return { total, count };
}

function updateCartSummary() {
    const cart = loadCart();
    const { total, count } = cartTotals(cart);

    const totalEl = document.getElementById("cartTotal");
    const countEl = document.getElementById("cartCount");

    if (totalEl) totalEl.textContent = total.toFixed(2);
    if (countEl) countEl.textContent = String(count);
}

function addToCart(item) {
    const cart = loadCart();
    const found = cart.find(i => i.id === item.id);

    if (found) found.qty += item.qty;
    else cart.push(item);

    saveCart(cart);
    updateCartSummary();
}

// ========= ALL PRODUCTS (3 categories) =========
const PRODUCTS = {
    candles: {
        leftOptions: [
            {
                id: "candle1", name: "Small Candle - Vanilla", price: 14.50, img: "Images/candles/candle1.webp",
                desc: "A warm and comforting vanilla scent that creates a cozy and relaxing atmosphere."
            },
            {
                id: "candle2", name: "Small Candle - Lavender", price: 14.50, img: "Images/candles/candle2.webp",
                desc: "A calming lavender fragrance designed to help you relax and unwind."
            },
            {
                id: "candle3", name: "Small Candle - Citrus", price: 15.50, img: "Images/candles/candle3.webp",
                desc: "A soft but tangy cirtrus  fragrance that adds elegance and warmth to any space."
            }, {
                id: "candle4", name: "Small Candle - Ocean Breeze", price: 15.50, img: "Images/candles/candle4.webp",
                desc: "A refreshing ocean breeze scent inspired by the calm and clean air of the seaside."
            }
        ],

        rightOptions: [
            {
                id: "tall-vanilla", name: "Tall Candle - Vanilla", price: 17.50, img: "Images/candles/tallcandle1.webp",
                desc: "A tall candle with a warm vanilla fragrance that fills the room with a cozy and relaxing aroma."
            },
            {
                id: "tall-rose", name: "Tall Candle - Rose", price: 18.50, img: "Images/candles/tallcandle2.webp",
                desc: "A floral rose scented candle that adds elegance and a gentle fragrance to your home."
            },
            {
                id: "tall-wood", name: "Tall Candle - Wood", price: 20.99, img: "Images/candles/tallcandle3.webp",
                desc: "A warm wood scented candle with earthy notes that create a cozy and natural atmosphere."
            },
            {
                id: "sandalwood-candle", name: "Tall Candle - Wood", price: 19.50, img: "Images/candles/tallcandle4.webp",
                desc: "A smooth sandalwood fragrance that brings a rich, calming scent perfect for relaxing spaces."

            }
        ]
    },

    mugs: {
        leftOptions: [
            {
                id: "mug-classic", name: "Classic Mug", price: 12.99, img: "Images/mugs/mugs1.webp",
                desc: "A classic ceramic mug perfect for coffee or tea, customizable with your own text or design."
            },
            {
                id: "mug-color", name: "Elephant Mug", price: 13.99, img: "Images/mugs/mugs2.webp",
                desc: "A stylish mug with a colored interior and handle, great for adding a fun personalized touch."
            },
            {
                id: "mug-color", name: "Cat Mug", price: 15.99, img: "Images/mugs/mugs3.webp",
                desc: "A large mug designed for bigger servings of your favorite drinks, ideal for cozy mornings."
            }, {
                id: "mug-color", name: "Good Enough Mug", price: 16.99, img: "Images/mugs/mugs4.webp",
                desc: "A simple and modern mug that highlights your custom design with a clean look."
            }
        ],
        rightOptions: [
            {
                id: "mug-travel", name: "Blue Thermos", price: 16.99, img: "Images/mugs/thermos1.webp",
                desc: "A durable thermos designed to keep your drinks hot or cold for longer periods."
            },
            {
                id: "mug-thermos", name: "Tree Thermos", price: 18.99, img: "Images/mugs/thermos2.webp",
                desc: "A portable thermos perfect for commuting, traveling, or taking drinks on the go."
            },
            {
                id: "mug-thermos", name: "Yellow + Green Thermos", price: 20.99, img: "Images/mugs/thermos3.webp",
                desc: "A lightweight thermos designed for active lifestyles and everyday hydration."
            },
            {
                id: "mug-thermos", name: "Sunny Thermos", price: 22.99, img: "Images/mugs/thermos4.webp",
                desc: "A high-quality insulated thermos that maintains temperature while showcasing your custom design."
            }
        ]
    },

    shirts: {
        leftOptions: [
            {
                id: "shirt-basic", name: "Custom T-Shirt", price: 19.99, img: "Images/shirts/shirt1.webp",
                desc: "A comfortable classic t-shirt that can be customized with names, quotes, or simple designs."
            },
            {
                id: "shirt-premium", name: "Funny Cat", price: 23.99, img: "Images/shirts/shirt2.webp",
                desc: "A soft premium t-shirt made for clean heat-press prints and long-lasting wear."
            },
            {
                id: "shirt-premium", name: "Ducky", price: 25.99, img: "Images/shirts/shirt3.webp",
                desc: "A lightweight athletic t-shirt that’s great for teams, events, and active days."
            }, {
                id: "shirt-premium", name: "BOO!", price: 30.99, img: "Images/shirts/shirt4.webp",
                desc: "A relaxed oversized t-shirt style that’s trendy, comfortable, and perfect for bold designs."
            }
        ],
        rightOptions: [
            {
                id: "hoodie", name: "Custom Hoodie", price: 20.99, img: "Images/shirts/hoodie1.webp",
                desc: "A cozy classic hoodie that’s perfect for custom logos, names, and gift designs."
            },
            {
                id: "crewneck", name: "Custom Crewneck", price: 25.99, img: "Images/shirts/hoodie2.webp",
                desc: "A warm heavy hoodie made for colder weather with a clean, high-quality print finish."
            },
            {
                id: "crewneck", name: "Nasa", price: 32.99, img: "Images/shirts/hoodie3.webp",
                desc: "A hoodie option that’s easy to layer and looks great with simple custom designs."
            },
            {
                id: "crewneck", name: "Yellow Passion", price: 35.99, img: "Images/shirts/hoodie4.webp",
                desc: "A minimal hoodie with a smooth feel, ideal for clean text prints and modern styles."
            }
        ]
    }
};

// ========= PAGE LOAD (based on data-category) =========
const pageMain = document.querySelector("main.page");
const category = pageMain ? pageMain.getAttribute("data-category") : null;

// Elements (must exist on product pages)
const leftSelect = document.getElementById("leftSelect");
const rightSelect = document.getElementById("rightSelect");

function fillSelect(selectEl, options) {
    if (!selectEl) return;
    selectEl.innerHTML = "";
    options.forEach((opt, index) => {
        const o = document.createElement("option");
        o.value = String(index);
        o.textContent = opt.name;
        selectEl.appendChild(o);
    });
}

function applySelection(side, option) {
    const imgEl = document.getElementById(side + "Img");
    const titleEl = document.getElementById(side + "Title");
    const priceEl = document.getElementById(side + "Price");
    const descEl = document.getElementById(side + "Desc");

    if (imgEl) imgEl.src = option.img;
    if (titleEl) titleEl.textContent = option.name;
    if (priceEl) priceEl.textContent = option.price.toFixed(2);
    if (descEl) descEl.textContent = option.desc;
}

// Quantity
const qtyState = { left: 1, right: 1 };

function setQty(side, value) {
    qtyState[side] = Math.max(1, value);
    const el = document.getElementById(side + "Qty");
    if (el) el.textContent = String(qtyState[side]);
}

document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const side = btn.getAttribute("data-qty");
        const action = btn.getAttribute("data-action");
        if (!side || !action) return;

        const current = qtyState[side] || 1;
        if (action === "inc") setQty(side, current + 1);
        if (action === "dec") setQty(side, current - 1);
    });
});

// Add buttons
const leftAddBtn = document.getElementById("leftAddBtn");
const rightAddBtn = document.getElementById("rightAddBtn");

function initProductPage() {
    if (!category || !PRODUCTS[category]) return;

    const leftOptions = PRODUCTS[category].leftOptions;
    const rightOptions = PRODUCTS[category].rightOptions;

    fillSelect(leftSelect, leftOptions);
    fillSelect(rightSelect, rightOptions);

    if (leftOptions[0]) applySelection("left", leftOptions[0]);
    if (rightOptions[0]) applySelection("right", rightOptions[0]);

    if (leftSelect) {
        leftSelect.addEventListener("change", () => {
            const index = Number(leftSelect.value);
            applySelection("left", leftOptions[index]);
        });
    }

    if (rightSelect) {
        rightSelect.addEventListener("change", () => {
            const index = Number(rightSelect.value);
            applySelection("right", rightOptions[index]);
        });
    }

    if (leftAddBtn) {
        leftAddBtn.addEventListener("click", () => {
            const index = leftSelect ? Number(leftSelect.value) : 0;
            const opt = leftOptions[index];
            addToCart({ id: opt.id, name: opt.name, price: opt.price, qty: qtyState.left, img: opt.img });
        });
    }

    if (rightAddBtn) {
        rightAddBtn.addEventListener("click", () => {
            const index = rightSelect ? Number(rightSelect.value) : 0;
            const opt = rightOptions[index];
            addToCart({ id: opt.id, name: opt.name, price: opt.price, qty: qtyState.right, img: opt.img });
        });
    }
}

// Highlight active menu link
(function setActiveLink() {
    const file = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".side-menu a").forEach(a => {
        if (a.getAttribute("href") === file) a.classList.add("active");
    });
})();

// Get the button
let mybuttonUp = document.getElementById("myBtnUp");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybuttonUp.style.display = "block";
    } else {
        mybuttonUp.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
    // Smooth scroll behavior is handled by the CSS scroll-behavior property
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    // Alternatively, use the window.scrollTo method
    // window.scrollTo({ top: 0, behavior: "smooth" }); 
}


// Init
updateCartSummary();
initProductPage();