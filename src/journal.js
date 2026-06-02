// ============================================================
// src/journal.js
// Journal sayfasının beyni.
// localStorage'dan favorileri çeker ve gösterir.
// ============================================================

import { renderPokemonGrid, showEmptyState } from './modules/ui.js'
import { getFavorites, removeFavorite } from './modules/storage.js'


// ─── DOM elementlerini seç ───
const grid = document.getElementById('pokemon-grid')


// ─────────────────────────────────────────────
// init — Sayfa açıldığında çalışır
// localStorage'dan favorileri çeker ve gösterir
// ─────────────────────────────────────────────
function init() {
    if (!grid) return;
    // localStorage'dan kayıtlı favorileri al
    const favorites = getFavorites()
    console.log(favorites);

    // Eğer favori yoksa boş durum ekranı göster
    if (favorites.length === 0) {
        showEmptyState(grid)
        return
    }

    // Varsa kartları çiz
    renderPokemonGrid(favorites, grid)
}


// ─────────────────────────────────────────────
// Favori Toggle — yıldıza tıklandığında
// Pokémon'u favorilerden çıkar
// ─────────────────────────────────────────────
grid.addEventListener('click', (event) => {

    // Tıklanan element veya üst elementlerinde data-fav-id var mı?
    const favBtn = event.target.closest('[data-fav-id]')

    // Yıldız butonu değilse bir şey yapma
    if (!favBtn) return

    // Hangi pokemon? ID'yi al
    const id = Number(favBtn.dataset.favId)

    // Favorilerden çıkar
    removeFavorite(id)

    // Butonu gri yap (çıkarıldı işareti)
    favBtn.classList.remove('text-yellow-400')
    favBtn.classList.add('text-gray-600')

    // 300ms sonra sayfayı yenile (animasyonlu geçiş izni ver)
    setTimeout(() => {
        init()
    }, 200)
})


// ─── Sayfayı yükle ───
init()
