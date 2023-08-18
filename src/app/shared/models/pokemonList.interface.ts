export interface PokemonList {
    isShiny ?: boolean,
    name: string,
    url: string,
    id: number
}

export interface PokemonDataBase {
    pokemonId: number,
    isShiny: boolean,
    catchedDate: number
}