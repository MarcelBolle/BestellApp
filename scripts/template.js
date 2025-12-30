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
                        <button class="add-btn" onclick="addToBasket('${dish.name}', ${dish.price})">Hinzufügen</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getBasketItemTemplate(item) {
    const itemTotal = item.price * item.amount;
    
    const topDeleteButton = item.amount > 1 
        ? `<button class="btn-icon-top" onclick="removeFromBasket('${item.name}', true)">
             <img src="./assets/icons/delete.svg" alt="Löschen">
           </button>` 
        : '';

    const leftControlButton = item.amount === 1
        ? `<button class="btn-icon" onclick="removeFromBasket('${item.name}', true)">
             <img src="./assets/icons/delete.svg" alt="Löschen">
           </button>`
        : `<button class="btn-control" onclick="removeFromBasket('${item.name}')">-</button>`;

    return `
        <div class="basket-item">
            <div class="basket-item-header">
                <span class="basket-item-title">${item.amount} x ${item.name}</span>
                ${topDeleteButton}
            </div>
            
            <div class="basket-item-bottom">
                <div class="basket-controls">
                    ${leftControlButton}
                    <span class="amount-display">${item.amount}</span>
                    <button class="btn-control" onclick="addToBasket('${item.name}', ${item.price})">+</button>
                </div>
                <span class="basket-price">${itemTotal.toFixed(2)} €</span>
            </div>
        </div>
    `;
}