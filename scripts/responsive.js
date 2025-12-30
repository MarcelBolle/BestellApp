function toggleMobileBasket() {
    const basket = document.getElementById('basket-modal');
    const overlay = document.getElementById('mobile-basket-overlay');
    
    if (!basket || !overlay) return;

    const isOpen = basket.classList.toggle('show-mobile-basket');
    overlay.classList.toggle('show-overlay');
    
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

function updateMobileCounter(count) {
    const mobileBadge = document.getElementById('mobile-basket-count');
    if (!mobileBadge) return;
        
    mobileBadge.innerText = count;
    mobileBadge.style.display = count === 0 ? 'none' : 'flex';
}