import { Component, OnInit, inject } from '@angular/core';
import { PomodoroService } from '../../services/pomodoro/pomodoro.service';
import { Steps } from '../../enums/steps.enum';
import { takeUntil, Subject, tap } from 'rxjs';
import { PokemonService } from '../../services/pokemon/pokemon.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  private readonly pomodoroService = inject(PomodoroService);
  private readonly pokemonService = inject(PokemonService);

  private destroy$ = new Subject<void>();
  public isSpawn : boolean = false;
  
  ngOnInit(): void {
    this.pomodoroService.step$.pipe(
      takeUntil(this.destroy$),
      tap(()=> console.log('playground component ngoninit'))
    )
    .subscribe(stepFromService =>{
      this.isSpawn = stepFromService == Steps.SPAWNED
      if (stepFromService == Steps.SPAWNED) {
        this.spawnRandomPokemon()
      }
    })
  }

  public spawnRandomPokemon(){
    this.pokemonService.getPokemons().subscribe(
      res =>{
      }
    )
  }

}
