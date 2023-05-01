import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { PomodoroService } from '../../services/pomodoro/pomodoro.service';
import { Steps } from '../../enums/steps.enum';
import { takeUntil, Subject, tap } from 'rxjs';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { PokemonList } from '../../models/pokemonList.interface';
import { AudioService } from '../../services/audio/audio.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  private readonly pomodoroService = inject(PomodoroService);
  private readonly pokemonService = inject(PokemonService);
  private readonly audioService = inject(AudioService);

  @Output() pokemonSpawned = new EventEmitter<PokemonList>();
  private destroy$ = new Subject<void>();
  public isSpawn : boolean = false;
  public isRunning : boolean = false;
  public isPokeballUsed : boolean = false;
  public pokemonUrl : string = '';
  
  ngOnInit(): void {
    this.pomodoroService.step$.pipe(
      takeUntil(this.destroy$),
      tap(()=> console.log('playground component ngoninit'))
    )
    .subscribe(stepFromService =>{
      this.isRunning =  stepFromService == Steps.RUNNING;
      this.isSpawn = stepFromService == Steps.SPAWNED;
      this.isPokeballUsed =  stepFromService == Steps.POKEBALL_USED;
      if (this.isSpawn) {
        this.audioService.playAudioBattle();
        this.generateRandomPokemon();
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
