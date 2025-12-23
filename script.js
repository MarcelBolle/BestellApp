//region Variablen
const dishList = document.getElementById("product-list");
let myBasket = JSON.parse(localStorage.getItem('basket')) || [];
//endregion

//region Helper
function calculateTotal() {
    return myBasket.reduce((sum, item) => sum + (item.price * item.amount), 0);
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
function renderDishes(myDishes) {
    if (!dishList) return;
    dishList.innerHTML = myDishes.map(getDishTemplate).join('');
}

function renderBasket() {
    const basketContainer = document.getElementById("basket-items");
    const totalContainer = document.getElementById("basket-total");
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

renderDishes(myDishes);
renderBasket();
// endregion