//region Variablen
const dishList = document.getElementById("product-list");
let myBasket = JSON.parse(localStorage.getItem('basket')) || [];
//endregion

//region Helper
function calculateTotal() {
    return myBasket.reduce((sum, item) => sum + (item.price * item.amount), 0);
}

function getBasketStatus(dishName) {
    const item = myBasket.find(i => i.name === dishName);
    if (item && item.amount > 0) {
        return `<span class="added-badge">Added ${item.amount}</span>`;
    }
    return '';
}

function initApp() {
    const pizzas = myDishes.filter(d => d.category === 'Pizza');
    const burgers = myDishes.filter(d => d.category === 'Burger');
    const pasta = myDishes.filter(d => d.category === 'Pasta');
    const salat = myDishes.filter(d => d.category === 'Salat');

    renderDishes(pizzas, "pizza-list");
    renderDishes(burgers, "burger-list");
    renderDishes(pasta, "pasta-list");
    renderDishes(salat, "salat-list");
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
}

function removeFromBasket(name) {
    const foundDish = myBasket.find((dish) => dish.name === name);
    if (foundDish) {
        foundDish.amount--;
        if (foundDish.amount <= 0) {
            myBasket = myBasket.filter((dish) => dish.name !== name);
        }
    }
    renderBasket();
}
//endregion

// region Rendering
function renderDishes(dishes, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = dishes.map(getDishTemplate).join('');
}

function renderBasket() {
    const basketContainer = document.getElementById("basket-items");
    const totalContainer = document.getElementById("total-amount");
    if (!basketContainer || !totalContainer) return;

    if (myBasket.length === 0) {
        basketContainer.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
        totalContainer.innerText = "0.00 €";
        return;
    }

    basketContainer.innerHTML = myBasket.map(getBasketItemTemplate).join('');
    totalContainer.innerText = `${calculateTotal().toFixed(2)} €`;
    
    localStorage.setItem('basket', JSON.stringify(myBasket));
}

initApp();
renderBasket();
// endregion