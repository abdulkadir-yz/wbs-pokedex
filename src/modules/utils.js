// ============================================================
// src/modules/utils.js
// Küçük yardımcı fonksiyonlar.
// Hiçbir şeye bağımlı değil — saf JS fonksiyonları.
// ============================================================


// ─────────────────────────────────────────────
// capitalize → ilk harfi büyük yapar
// "pikachu" → "Pikachu"
// ─────────────────────────────────────────────
export function capitalize(str) {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
}


// ─────────────────────────────────────────────
// formatId → ID'yi 3 haneli stringe çevirir
// 1   → "#001"
// 25  → "#025"
// 150 → "#150"
// ─────────────────────────────────────────────
export function formatId(id) {
    return '#' + String(id).padStart(3, '0')
}


// ─────────────────────────────────────────────
// getImageUrl → Pokémon ID'sinden resim URL'i üretir
// 25 → "https://raw.githubusercontent.com/.../25.svg"
// ─────────────────────────────────────────────
export function getImageUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
}


// ─────────────────────────────────────────────
// getTypeColor → Tipe göre Tailwind renk class'ı döner
// "fire" → "bg-orange-500"
// "water" → "bg-blue-500"
// ─────────────────────────────────────────────
export function getTypeColor(type) {
    const colors = {
        fire:     'bg-orange-500',
        water:    'bg-blue-500',
        grass:    'bg-green-500',
        electric: 'bg-yellow-400',
        psychic:  'bg-pink-500',
        ice:      'bg-cyan-400',
        dragon:   'bg-indigo-600',
        dark:     'bg-gray-700',
        fairy:    'bg-pink-300',
        poison:   'bg-purple-500',
        ground:   'bg-yellow-600',
        rock:     'bg-yellow-700',
        bug:      'bg-lime-500',
        ghost:    'bg-purple-700',
        steel:    'bg-gray-400',
        fighting: 'bg-red-700',
        normal:   'bg-gray-400',
        flying:   'bg-sky-400',
    }
    return colors[type] || 'bg-gray-400'
}