import { Component, inject} from '@angular/core';
import { PomodoroService } from '../../shared/services/pomodoro/pomodoro.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  private readonly pomodoroService = inject(PomodoroService);

  public text : string = 'Opps! no hay nada aqui!!'


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

  public isRunning(): boolean{
    return this.pomodoroService.isRunning;
  }

}
