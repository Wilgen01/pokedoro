import { Component, inject } from '@angular/core';
import { PomodoroService } from '../../services/pomodoro/pomodoro.service';
import { steps } from '../../enums/steps.enum';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {

  private readonly pomodoroService = inject(PomodoroService);
  
  isSpawn(){
    return this.pomodoroService.step == steps.SPAWNED
  }

}
