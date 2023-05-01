import { Component, inject} from '@angular/core';
import { PomodoroService } from '../../shared/services/pomodoro/pomodoro.service';
import { Steps } from 'src/app/shared/enums/steps.enum';
import { Subject, takeUntil, tap, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  private readonly pomodoroService = inject(PomodoroService);

  private destroy$ = new Subject<void>();
  public text : string = 'Opps! no hay nada aqui!!'
  public isSpawn : boolean = false;
  public isRunning : boolean = false;
  public isNotStarted : boolean = true;
  public isPokeballUsed : boolean = false;
  public isPokemonCatched : boolean = false;

  ngOnInit(): void {
    this.pomodoroService.step$.pipe(
      takeUntil(this.destroy$),
      tap(()=> console.log('playground component ngoninit'))
    )
    .subscribe(stepFromService =>{
      this.isSpawn = stepFromService == Steps.SPAWNED
      this.isRunning = stepFromService == Steps.RUNNING
      this.isNotStarted = stepFromService == Steps.NOT_STARTED
      this.isPokeballUsed = stepFromService == Steps.POKEBALL_USED
      this.isPokemonCatched = stepFromService == Steps.POKEMON_CATCH
    })
  }

  public startTimer(){
    this.pomodoroService.startTimer(0.1);
  }

  
  public stopTimer(){
    this.pomodoroService.stopTimer();
  }
  
  
  public timeLeft(): string{
    const timeLeft = this.pomodoroService.timeLeft;
    return new Date(timeLeft * 1000).toLocaleTimeString().split(':').slice(1).join(':');
  }

  public pokemonSpawned(event: string){
    this.text = event;
  }

  public catchPokemon(){
    if (this.isPokeballUsed) return
    this.pomodoroService.step$.next(Steps.POKEBALL_USED)
    timer(4000).subscribe(() => {
      this.pomodoroService.step$.next(Steps.NOT_STARTED)
      this.text = `!Ya está¡ El pokemon ha sido atrapado`
    })
  }


}
