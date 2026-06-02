// ============================================================
// src/modules/ui.js
// Ekrana bir şeyler çizmekten sorumlu.
// API'ye dokunmaz, localStorage'a dokunmaz.
// Sadece HTML üretir ve DOM'a yazar.
// ============================================================

import { capitalize, formatId, getTypeColor } from './utils.js'
import { isFavorite } from './storage.js'


// ─────────────────────────────────────────────
// createPokemonCard
// Tek bir Pokémon için HTML kartı üretir (string olarak)
// ─────────────────────────────────────────────
export function createPokemonCard(pokemon) {

    // Bu pokemon favoride mi? Yıldız rengini buna göre seç
    const starColor = isFavorite(pokemon.id)
        ? 'text-yellow-400'   // favorideyse → sarı
        : 'text-gray-600'     // değilse → gri

    // Her tip için renkli rozet HTML'i üret
    // ['fire', 'flying'] → iki tane span
    const typeBadges = pokemon.types
        .map(type => `
      <span class="${getTypeColor(type)} text-white text-xs px-2 py-1 rounded-full">
        ${type}
      </span>
    `)
        .join('')

    // Template literal ile kart HTML'i
    // data-fav-id → butona tıklandığında hangi pokemon olduğunu bileceğiz
    return `
    <div class="bg-gray-800 rounded-xl p-4 shadow-lg relative
                hover:scale-105 hover:bg-gray-700
                transition-all duration-200 cursor-pointer">

      <!-- Favori butonu — sağ üst köşe -->
      <button
        type="button"
        aria-label="Toggle favorite"
        title="Add to Journal"
        aria-pressed="${isFavorite(pokemon.id)}"
        class="absolute top-2 right-2 z-20 inline-flex items-center justify-center
               w-10 h-10 rounded-full bg-gray-900/70 text-2xl ${starColor}
               hover:text-yellow-400 hover:bg-gray-900 transition-colors
               cursor-pointer select-none"
        data-fav-id="${pokemon.id}"
      >
       <span calss="pointer-evets-none">⭐</span>
      </button>

      <!-- Pokémon resmi -->
      <img
        src="${pokemon.image}"
        alt="${pokemon.name}"
        class="w-24 h-24 mx-auto object-contain"
        loading="lazy"
      />

      <!-- ID + İsim + Tipler -->
      <div class="text-center mt-3">
        <p class="text-gray-500 text-xs">${formatId(pokemon.id)}</p>
        <h3 class="text-white font-bold text-base mt-1">
          ${capitalize(pokemon.name)}
        </h3>
        <div class="flex gap-1 justify-center mt-2 flex-wrap">
          ${typeBadges}
        </div>
      </div>

    </div>
  `
}


// ─────────────────────────────────────────────
// renderPokemonGrid
// Pokemon dizisini alır, hepsini grid'e yazar
// ─────────────────────────────────────────────
export function renderPokemonGrid(pokemons, container) {
    if (pokemons.length === 0) {
        showEmptyState(container)
        return
    }

    // Her pokemon için kart üret, hepsini birleştir, grid'e yaz
    container.innerHTML = pokemons
        .map(pokemon => createPokemonCard(pokemon))
        .join('')
}


// ─────────────────────────────────────────────
// showLoading — Yüklenme ekranı
// ─────────────────────────────────────────────
export function showLoading(container) {
    container.innerHTML = `
    <div class="col-span-full text-center text-gray-400 py-20">
      <p class="text-5xl mb-4">⏳</p>
      <p class="text-xl">Pokémon'lar yükleniyor...</p>
    </div>
  `
}


// ─────────────────────────────────────────────
// showEmptyState — Sonuç bulunamadı ekranı
// ─────────────────────────────────────────────
export function showEmptyState(container) {
    container.innerHTML = `
    <div class="col-span-full text-center text-gray-400 py-20">
      <p class="text-5xl mb-4">🔍</p>
      <p class="text-xl">Pokemon doesnt exist</p>
      <p class="text-sm mt-2">Please try another name or number, Max number = 151</p>
    </div>
  `
}


// ─────────────────────────────────────────────
// showError — Hata ekranı
// ─────────────────────────────────────────────
export function showError(container) {
    container.innerHTML = `
    <div class="col-span-full text-center text-red-400 py-20">
      <p class="text-5xl mb-4">❌</p>
      <p class="text-xl">Something happen</p>
      <p class="text-sm mt-2">Please check your internet connection</p>
    </div>
  `
}