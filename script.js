//region Variablen
const dishList = document.getElementById("product-list");
let myBasket = JSON.parse(localStorage.getItem('basket')) || [];
const DELIVERY_COSTS = 4.90;
//endregion

//region Helper
function calculateTotal() {
    return myBasket.reduce((sum, item) => sum + (item.price * item.amount), 0);
}

function updateBasketSums() {
    const subtotal = calculateTotal();
    const delivery = subtotal > 0 ? DELIVERY_COSTS : 0;
    const total = subtotal + delivery;

    document.getElementById("total-amount").innerText = subtotal.toFixed(2) + " €";
    document.getElementById("delivery-fee").innerText = delivery.toFixed(2) + " €";
    document.getElementById("grand-total").innerText = total.toFixed(2) + " €";
}

function getBasketStatus(dishName) {
    const item = myBasket.find(i => i.name === dishName);
    if (item && item.amount > 0) {
        return `<span class="added-badge">Added ${item.amount}</span>`;
    }
    return '';

    
}

function renderMenu() {
    const pizzas = myDishes.filter(d => d.category === 'Pizza');
    const burgers = myDishes.filter(d => d.category === 'Burger');
    const pasta = myDishes.filter(d => d.category === 'Pasta');
    const salat = myDishes.filter(d => d.category === 'Salat');

    renderDishes(pizzas, "pizza-list");
    renderDishes(burgers, "burger-list");
    renderDishes(pasta, "pasta-list");
    renderDishes(salat, "salat-list");
}

function initApp() {
    renderMenu();
}

function placeOrder() {
    if (myBasket.length === 0) return; 

    myBasket = [];
    localStorage.setItem('basket', JSON.stringify(myBasket));

    renderBasket();
    renderMenu();

    const overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');

    setTimeout(closeOverlay, 3000);
}

function closeOverlay() {
    document.getElementById('overlay').classList.add('d-none');
}

//endregion

// region Logik
function addToBasket(name, price) {
    const foundDish = myBasket.find((dish) => dish.name === name);
    if (foundDish) {
        foundDish.amount++;
    } else {
        myBasket.push({ name: name, price: price, amount: 1 });
    }
    renderBasket();
    renderMenu();
}

function removeFromBasket(name, deleteFully = false) {
    const foundDish = myBasket.find((dish) => dish.name === name);
    
    if (foundDish) {
        if (deleteFully) {
            myBasket = myBasket.filter((dish) => dish.name !== name);
        } else {
            foundDish.amount--;
            if (foundDish.amount <= 0) {
                myBasket = myBasket.filter((dish) => dish.name !== name);
            }
        }
    }
    
    renderBasket();
    renderMenu();
}
//endregion

// region Rendering
function renderDishes(dishes, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = dishes.map(getDishTemplate).join('');
}

function renderBasket() {
    const basketItemsContainer = document.getElementById("basket-items");
    const mainBasketContainer = document.getElementById("basket-modal");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (!basketItemsContainer || !mainBasketContainer) return;

    if (myBasket.length === 0) {
        mainBasketContainer.classList.add("d-none");
        basketItemsContainer.innerHTML = "";
    } else {
        mainBasketContainer.classList.remove("d-none");
        basketItemsContainer.innerHTML = myBasket.map(getBasketItemTemplate).join('');
    }

    updateBasketSums();
}

initApp();
renderBasket();
// endregion