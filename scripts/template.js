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