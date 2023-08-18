import Dexie, { Table } from 'dexie';
import { PokemonDataBase } from '../../models/pokemonList.interface';

export class AppDB extends Dexie {

  public UserPokemonTable!: Table<PokemonDataBase, number>

  constructor() {
    super('Pokedoro');
    this.version(1).stores({
      UserPokemonTable: '++id, pokemonId, isShiny, catchedDate',
    });
  }
}

export const db = new AppDB();