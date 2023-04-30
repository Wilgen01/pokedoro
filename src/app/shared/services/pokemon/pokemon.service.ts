import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PokemonList } from '../../models/pokemonList.interface';
import { map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly http = inject(HttpClient)
  public pokemons : PokemonList[] = []

  getPokemons(){
    if (this.pokemons.length > 0) return of(this.pokemons)

    return this.http.get<{results: PokemonList[]}>('../../../../assets/staticData/pokemons.json').pipe(
      tap(res => this.pokemons = res.results),
      map(res => res.results)
    )
  }

}
