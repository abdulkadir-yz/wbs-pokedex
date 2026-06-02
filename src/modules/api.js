// ============================================================
// src/modules/api.js
// PokéAPI ile tüm iletişim buradan yapılır.
// ============================================================

import { getImageUrl } from './utils.js'

const BASE_URL = 'https://pokeapi.co/api/v2'


// ─────────────────────────────────────────────
// fetchPokemonList → İlk 151 Pokémon'un
// isim ve ID listesini getirir
// ─────────────────────────────────────────────
export async function fetchPokemonList(limit = 151, offset = 0) {
    try {
        const response = await fetch(
            `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
        )

        if (!response.ok) {
            throw new Error(`Liste alınamadı: ${response.status}`)
        }

        const data = await response.json()

        // data.results → [{ name: "bulbasaur", url: "..." }, ...]
        // URL'den ID'yi çıkarıyoruz: ".../pokemon/1/" → 1
        return data.results.map((pokemon, index) => ({
            name: pokemon.name,
            id:   index + 1,    // offset=0 ise 1'den başlar
        }))

    } catch (error) {
        console.error('fetchPokemonList hatası:', error)
        return []
    }
}


// ─────────────────────────────────────────────
// fetchPokemonDetail → Tek Pokémon'un detayları
// ─────────────────────────────────────────────
export async function fetchPokemonDetail(nameOrId) {
    try {
        const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`)

        if (!response.ok) {
            throw new Error(`Pokémon bulunamadı: ${nameOrId}`)
        }

        const data = await response.json()

        // Ham API verisinden sadece lazım olanları alıyoruz
        return {
            id:    data.id,
            name:  data.name,
            image: getImageUrl(data.id),   // utils.js'den
            types: data.types.map(t => t.type.name),
            stats: {
                hp:      data.stats[0].base_stat,
                attack:  data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed:   data.stats[5].base_stat,
            },
        }

    } catch (error) {
        console.error(`fetchPokemonDetail hatası (${nameOrId}):`, error)
        return null
    }
}