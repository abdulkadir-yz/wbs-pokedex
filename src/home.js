// ============================================================
// src/home.js
// Ana sayfanın beyni.
// API'den veri çeker, UI'ya verir, olayları dinler.
// ============================================================

import { fetchPokemonList, fetchPokemonDetail } from './modules/api.js'
import { renderPokemonGrid, showLoading, showError } from './modules/ui.js'
import { addFavorite, removeFavorite, isFavorite } from './modules/storage.js'


// ─── DOM elementlerini seç ───
// Bunları bir kez seçip değişkende tutuyoruz
// Her seferinde document.getElementById yazmak yerine
const grid        = document.getElementById('pokemon-grid')
const searchInput = document.getElementById('search-input')

// Tüm Pokémon verisi burada saklanır
// Arama yaparken bu diziye filtre uygulayacağız
let allPokemons = []


// ─────────────────────────────────────────────
// init — Uygulama başladığında çalışır
// ─────────────────────────────────────────────
async function init() {

    // 1. Yüklenme ekranını göster
    showLoading(grid)

    try {
        // 2. İlk 151 Pokémon'un listesini çek
        // [{name: 'bulbasaur', id: 1}, {name: 'ivysaur', id: 2}, ...]
        const list = await fetchPokemonList(151)

        // 3. Hepsinin detayını aynı anda çek (Promise.all)
        // list.map → her pokemon için fetchPokemonDetail çağrısı yapar
        // Promise.all → hepsi bitmeden devam etmez
        allPokemons = await Promise.all(
            list.map(p => fetchPokemonDetail(p.id))
        )

        // 4. Hata alınan pokemon'ları temizle (null olanlar)
        allPokemons = allPokemons.filter(p => p !== null)

        // 5. Kartları çiz
        renderPokemonGrid(allPokemons, grid)

    } catch (error) {
        console.error('init eror:', error)
        showError(grid)
    }
}


// ─────────────────────────────────────────────
// Arama — kullanıcı yazdıkça filtrele
// ─────────────────────────────────────────────
searchInput.addEventListener('input', () => {

    // Kullanıcının yazdığını al, küçük harfe çevir
    const query = searchInput.value.trim().toLowerCase()

    // Arama kutusu boşsa tüm listeyi göster
    if (!query) {
        renderPokemonGrid(allPokemons, grid)
        return
    }

    // İsim VEYA ID'ye göre filtrele
    const filtered = allPokemons.filter(pokemon =>
        pokemon.name.includes(query) ||        // "pika" → pikachu
        String(pokemon.id).includes(query)     // "25"   → id:25
    )

    renderPokemonGrid(filtered, grid)
})


// ─────────────────────────────────────────────
// Favori Toggle — yıldıza tıklandığında
//
// Event Delegation kullanıyoruz:
// Her karta ayrı ayrı listener eklemek yerine
// grid'e tek bir listener koyuyoruz.
// Tıklama grid içindeyse hangi butona tıklandığını buluyoruz.
// ─────────────────────────────────────────────
grid.addEventListener('click', (event) => {

    // Tıklanan element veya üst elementlerinde data-fav-id var mı?
    const favBtn = event.target.closest('[data-fav-id]')

    // Yıldız butonu değilse bir şey yapma
    if (!favBtn) return

    // Hangi pokemon? ID'yi al, pokemon'u bul
    const id      = Number(favBtn.dataset.favId)
    const pokemon = allPokemons.find(p => p.id === id)
    if (!pokemon) return

    // Favoride mi değil mi?
    if (isFavorite(id)) {
        // Favorideyse → çıkar, gri yap
        removeFavorite(id)
        favBtn.classList.remove('text-yellow-400')
        favBtn.classList.add('text-gray-600')
    } else {
        // Favoride değilse → ekle, sarı yap
        addFavorite(pokemon)
        favBtn.classList.remove('text-gray-600')
        favBtn.classList.add('text-yellow-400')
    }
})


// ─── Uygulamayı başlat ───
init()