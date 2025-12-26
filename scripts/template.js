// templates.js
function getDishTemplate(dish) {
    return `
        <div class="dish-card">
            <img src="${dish.image}" alt="${dish.name}" class="dish-image" />
            
            <div class="dish-info">
                <div class="dish-header">
                    <h3>${dish.name}</h3>
                    <p class="description">${dish.description}</p>
                </div>
                
                <div class="dish-footer">
                    <span class="price">${dish.price.toFixed(2)}€</span>
                    <div class="action-buttons">
                        ${getBasketStatus(dish.name)} 
                        <button class="add-btn" onclick="addToBasket('${dish.name}', ${dish.price})">+</button>
                    </div>
                </div>
            </div>
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