import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { PomodoroService } from '../../services/pomodoro/pomodoro.service';
import { Steps } from '../../enums/steps.enum';
import { takeUntil, Subject, tap } from 'rxjs';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { PokemonList } from '../../models/pokemonList.interface';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  private readonly pomodoroService = inject(PomodoroService);
  private readonly pokemonService = inject(PokemonService);

  @Output() pokemonSpawned = new EventEmitter<PokemonList>();
  private destroy$ = new Subject<void>();
  public isSpawn : boolean = false;
  public isPokeballUsed : boolean = false;
  public pokemonUrl : string = '';
  
  ngOnInit(): void {
    this.pomodoroService.step$.pipe(
      takeUntil(this.destroy$),
      tap(()=> console.log('playground component ngoninit'))
    )
    .subscribe(stepFromService =>{
      if (stepFromService == Steps.SPAWNED) {
        this.isSpawn = true;
        this.generateRandomPokemon();
      }
      if (stepFromService == Steps.POKEBALL_USED) {
        this.isSpawn = false;
        this.isPokeballUsed = true;
      }
    })
  }

  public generateRandomPokemon() {
    const randomPokemonId = Math.floor(Math.random() * 386) + 1;
    this.pokemonService.getPokemons().subscribe(pokemonList =>{
      this.spawnRandomPokemon(pokemonList[randomPokemonId - 1], randomPokemonId)
    })
  }

  public spawnRandomPokemon(pokemon : PokemonList, idPokemon: number) {
    this.pokemonUrl = '';
    const shinyProbability  = 1
    const shinyRatio = Math.floor(Math.random() * 100) + 1;
    if (shinyRatio <= shinyProbability) {
      pokemon.isShiny = true;
      this.pokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${idPokemon}.gif`
    }else{
      this.pokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${idPokemon}.gif`
    }
    this.pokemonSpawned.emit(pokemon);    
  }

}
