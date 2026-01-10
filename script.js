//region Variablen
const dishList = document.getElementById("product-list");
let myBasket = JSON.parse(localStorage.getItem("basket")) || [];
const DELIVERY_COSTS = 4.9;
//endregion

//region Helper
function loadBasket() {
  const saved = localStorage.getItem("basket");
  myBasket = saved ? JSON.parse(saved) : [];
}

function saveBasket() {
  localStorage.setItem("basket", JSON.stringify(myBasket));
}


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
  return item && item.amount > 0
    ? `<span class="added-badge">Added ${item.amount}</span>`
    : "";
}

function renderMenu() {
  const categories = ["Pizza", "Burger", "Pasta", "Salat"];
  categories.forEach((cat) => {
    const dishes = myDishes.filter((d) => d.category === cat);
    renderDishes(dishes, `${cat.toLowerCase()}-list`);
  });
}

function initApp() {
  loadBasket();
  renderMenu();
  renderBasket();
  requestAnimationFrame(() => {
    document.body.classList.remove("menu-loading");
  });
}
//endregion

//region Order Logic
function placeOrder() {
  if (myBasket.length === 0) return;
  clearBasketData();
  renderBasket();
  renderMenu();
  toggleMobileBasket();
  showOrderConfirmation();
}

function clearBasketData() {
  myBasket = [];
  localStorage.setItem("basket", JSON.stringify(myBasket));
  saveBasket();
}

function showOrderConfirmation() {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("d-none");
  setTimeout(() => overlay.classList.add("d-none"), 3000);
}
//endregion

//region Basket Logic
function addToBasket(name, price) {
  const foundDish = myBasket.find((dish) => dish.name === name);
  if (foundDish) {
    foundDish.amount++;
  } else {
    myBasket.push({ name: name, price: price, amount: 1 });
  }
  saveBasket();
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
  saveBasket();
  renderBasket();
  renderMenu();
}
//endregion

//region Rendering
function renderDishes(dishes, containerId) {
  const container = document.getElementById(containerId);
  if (container) container.innerHTML = dishes.map(getDishTemplate).join("");
}

function renderBasket() {
  const els = getBasketElements();
  if (!els) return;

  resetBasketUI(els);

  if (isBasketEmpty()) {
    finalizeBasket();
    return;
  }

  showBasket(els);
  renderBasketItems(els.itemsCon);
  handleBasketScroll(els.basketEl);

  finalizeBasket();
}

function getBasketElements() {
  const itemsCon = document.getElementById("basket-items");
  const modal = document.getElementById("basket-modal");
  const basketEl = document.getElementById("basket-content");

  if (!itemsCon || !modal) return null;

  return { itemsCon, modal, basketEl };
}

function resetBasketUI({ itemsCon, modal, basketEl }) {
  itemsCon.innerHTML = "";
  modal.classList.add("d-none");
  if (basketEl) basketEl.classList.remove("scroll-items");
}

function isBasketEmpty() {
  return myBasket.length === 0;
}

function showBasket({ modal }) {
  modal.classList.remove("d-none");
}

function renderBasketItems(itemsCon) {
  let html = "";

  for (let i = 0; i < myBasket.length; i++) {
    html += getBasketItemTemplate(myBasket[i]);
  }

  itemsCon.innerHTML = html;
}

function handleBasketScroll(basketEl) {
  if (!basketEl) return;

  const totalItems = myBasket.reduce((sum, item) => sum + item.amount, 0);
  if (totalItems >= 3) basketEl.classList.add("scroll-items");
}

function finalizeBasket() {
  updateBasketSums();
  updateBadges();
}
//endregion

//region Overlay / UI
function closeOverlay() {
  const overlay = document.querySelector(".overlay");
  const basketModal = document.getElementById("basket-modal");

  if (overlay) overlay.classList.add("d-none");
  if (basketModal) basketModal.classList.add("d-none");

  document.body.style.overflow = "";
}
//endregion

//region Init
// initApp();
//endregion

