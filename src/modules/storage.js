// ============================================================
// src/modules/storage.js
// localStorage işlemleri burada.
// localStorage = tarayıcının içindeki mini veritabanı.
// Sayfa kapansa bile veriler kaybolmaz.
// ============================================================

// Anahtarımız — localStorage'da hangi isimle saklayacağız
const STORAGE_KEY = 'pokedex-favorites'


// ─────────────────────────────────────────────
// getFavorites → Kayıtlı favorileri getirir
// Her zaman array döner (null/undefined riski yok)
// ─────────────────────────────────────────────
export function getFavorites() {
    // localStorage sadece STRING saklar.
    // Biz obje/array saklıyoruz, bu yüzden JSON kullanıyoruz.
    //
    // JSON.stringify → objeyi stringe çevirir (kaydetmek için)
    // JSON.parse     → stringi objeye çevirir (okumak için)

    const data = localStorage.getItem(STORAGE_KEY)

    // Hiç favori eklenmemişse localStorage'da null döner
    // O zaman boş array dön
    return data ? JSON.parse(data) : []
}


// ─────────────────────────────────────────────
// addFavorite → Favorilere Pokémon ekler
// pokemon: { id, name, image, types, stats }
// ─────────────────────────────────────────────
export function addFavorite(pokemon) {
    const favorites = getFavorites()

    // Zaten ekli mi kontrol et (çift ekleme olmasın)
    const alreadyAdded = favorites.some(fav => fav.id === pokemon.id)
    if (alreadyAdded) return

    // Listeye ekle
    favorites.push(pokemon)

    // Geri localStorage'a kaydet
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}


// ─────────────────────────────────────────────
// removeFavorite → Favorilerden Pokémon çıkarır
// id: Pokémon'un ID'si
// ─────────────────────────────────────────────
export function removeFavorite(id) {
    const favorites = getFavorites()

    // Bu ID'ye sahip olmayan Pokémon'ları tut (filtreliyoruz)
    const updated = favorites.filter(fav => fav.id !== id)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}


// ─────────────────────────────────────────────
// isFavorite → Pokémon favoride mi?
// true/false döner
// ─────────────────────────────────────────────
export function isFavorite(id) {
    const favorites = getFavorites()
    return favorites.some(fav => fav.id === id)
}