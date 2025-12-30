//region Variablen
const dishList = document.getElementById("product-list");
let myBasket = JSON.parse(localStorage.getItem("basket")) || [];
const DELIVERY_COSTS = 4.9;
//endregion

//region Helper
function calculateTotal() {
  return myBasket.reduce((sum, item) => sum + item.price * item.amount, 0);
}

function updateBasketSums() {
  const subtotal = calculateTotal();
  const delivery = subtotal > 0 ? DELIVERY_COSTS : 0;
  const total = subtotal + delivery;

  document.getElementById("total-amount").innerText = subtotal.toFixed(2) + " €";
  document.getElementById("delivery-fee").innerText = delivery.toFixed(2) + " €";
  document.getElementById("grand-total").innerText = total.toFixed(2) + " €";
}

function updateBadges() {
    const totalItems = myBasket.reduce((sum, item) => sum + item.amount, 0);
    const desktopBadge = document.getElementById("basket-count");
    
    if (desktopBadge) desktopBadge.innerText = totalItems;
    if (typeof updateMobileCounter === "function") updateMobileCounter(totalItems);
}

function getBasketStatus(dishName) {
  const item = myBasket.find((i) => i.name === dishName);
  return (item && item.amount > 0) ? `<span class="added-badge">Added ${item.amount}</span>` : "";
}

function renderMenu() {
  const categories = ["Pizza", "Burger", "Pasta", "Salat"];
  categories.forEach(cat => {
      const dishes = myDishes.filter(d => d.category === cat);
      renderDishes(dishes, `${cat.toLowerCase()}-list`); // Dynamische ID
  });
}

function initApp() {
  renderMenu();
}
//endregion

//region Order Logic
function placeOrder() {
  if (myBasket.length === 0) return;
  clearBasketData();
  renderBasket();
  renderMenu();
  closeMobileBasket();
  showOrderConfirmation();
}

function clearBasketData() {
    myBasket = [];
    localStorage.setItem("basket", JSON.stringify(myBasket));
}

function showOrderConfirmation() {
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("d-none");
    setTimeout(() => overlay.classList.add("d-none"), 3000);
}
//endregion

// region Basket Logic
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
    foundDish.amount--;
    if (deleteFully || foundDish.amount <= 0) {
       myBasket = myBasket.filter((dish) => dish.name !== name);
    }
  }
  renderBasket();
  renderMenu();
}
//endregion

// region Rendering
function renderDishes(dishes, containerId) {
  const container = document.getElementById(containerId);
  if (container) container.innerHTML = dishes.map(getDishTemplate).join("");
}

function renderBasket() {
  const itemsCon = document.getElementById("basket-items");
  const modal = document.getElementById("basket-modal");
  if (!itemsCon || !modal) return;

  const isEmpty = myBasket.length === 0;
  modal.classList.toggle("d-none", isEmpty);
  itemsCon.innerHTML = isEmpty ? "" : myBasket.map(getBasketItemTemplate).join("");

  updateBasketSums();
  updateBadges();
}

initApp();
renderBasket();
// endregion