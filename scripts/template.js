// templates.js
function getDishTemplate(dish) {
    return `
        <div class="dish-card">
            <img src="${dish.image}" alt="${dish.name}" class="dish-image" />
            <div>
                <h3>${dish.name}</h3>
                <p>${dish.description}</p>
            </div>
            <p>Preis: ${dish.price.toFixed(2)} €</p>
            <button onclick="addToBasket('${dish.name}', ${dish.price})">
                In den Warenkorb
            </button>
        </div>
    `;
}

function getBasketItemTemplate(item) {
    const itemTotal = item.price * item.amount; 
    return `
        <div class="basket-item">
            <span>${item.amount}x ${item.name}</span>
            <span>${itemTotal.toFixed(2)} €</span>
            <div class="basket-controls">
                <button onclick="removeFromBasket('${item.name}')">-</button>
                <button onclick="addToBasket('${item.name}', ${item.price})">+</button>
            </div>
        </div>
    `;
}