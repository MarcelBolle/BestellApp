/* scripts/responsive.js */

function toggleMobileBasket() {
    const basket = document.getElementById('basket-modal');
    const overlay = document.getElementById('mobile-basket-overlay');
    
    // Sicherheits-Check: Abbrechen, wenn Elemente nicht da sind
    if (!basket || !overlay) return;

    // Klassen umschalten (auf/zu)
    const isOpen = basket.classList.toggle('show-mobile-basket');
    overlay.classList.toggle('show-overlay');
    
    // Scrollen auf dem Body sperren, wenn offen
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

function updateMobileCounter(count) {
    const mobileBadge = document.getElementById('mobile-basket-count');
    if (!mobileBadge) return;
        
    mobileBadge.innerText = count;
    // Wenn 0, ausblenden (display: none), sonst flex
    mobileBadge.style.display = count === 0 ? 'none' : 'flex';
}