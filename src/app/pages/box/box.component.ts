import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { from } from 'rxjs';
import { PokemonDataBase } from 'src/app/shared/models/pokemonList.interface';

import { db } from 'src/app/shared/services/dataBase/db';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent {

  userPokemons$ = liveQuery(() => db.UserPokemonTable.toArray());
  totalPokemons$ = from(db.UserPokemonTable.count()); 

  publicGetPokemonUrlById(pokemon: PokemonDataBase){
    const baseUrl = pokemon.isShiny? environment.POKEMON_SHINY_URL : environment.POKEMON_URL;
    return `${baseUrl}${pokemon.pokemonId}.gif`
  }
}
