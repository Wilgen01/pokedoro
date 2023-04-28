import { Injectable } from '@angular/core';
import { Observable, Subject, interval, takeUntil, takeWhile, tap } from 'rxjs';
import { steps } from '../../enums/steps.enum';

@Injectable({
  providedIn: 'root'
})
export class PomodoroService {

  private timer$: Observable<number>;
  private stop$ : Subject<boolean>= new Subject;
  private _timeLeft: number = 15 * 60;
  private _isRunning: boolean = false;
  private _step: steps = steps.NOT_STARTED;

  
  public get step(): steps {
    return this._step;
  }

  public get isRunning(): boolean {
    return this._isRunning;
  }

  public get timeLeft(): number {
    return this._timeLeft;
  }
  

  constructor() { 
    this.timer$ = interval(1000).pipe(
      takeUntil(this.stop$),
      tap((value) => console.log(value))
    )
  }


  public startTimer(timeInMinutes: number){
    this._isRunning = true;
    this._timeLeft =  timeInMinutes * 60
    this.timer$.subscribe(value =>{
      this._timeLeft -= 1
      if (this._timeLeft == 0) {
        this.completeTimer();
      }
    })
  }

  public completeTimer(){
    this._step = steps.SPAWNED;
    this.stopTimer();
  }

  public stopTimer(){
    this._isRunning = false;
    this.stop$.next(true);
  }



}
