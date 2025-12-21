const dishList = document.getElementById("product-list");

function renderDishes(myDishes) {
    if (!dishList) return;

    let htmlContent = "";
    myDishes.forEach(dish => {
        htmlContent += getDishTemplate(dish);
    });

    dishList.innerHTML = htmlContent;
}
renderDishes(myDishes);