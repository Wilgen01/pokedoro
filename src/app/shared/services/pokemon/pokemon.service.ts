import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly http = inject(HttpClient)

  getPokemons(){
    return this.http.get('../../../../assets/staticData/pokemons.json')
  }

}
