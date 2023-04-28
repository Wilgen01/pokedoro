import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PokemonList } from '../../models/pokemonList.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly http = inject(HttpClient)

  getPokemons(){
    return this.http.get<PokemonList[]>('../../../../assets/staticData/pokemons.json')
  }

}
