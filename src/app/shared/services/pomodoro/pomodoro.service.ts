import { Injectable } from '@angular/core';
import { Observable, Subject, interval, takeUntil, takeWhile, tap } from 'rxjs';
import { Steps } from '../../enums/steps.enum';

@Injectable({
  providedIn: 'root'
})
export class PomodoroService {

  private timer$: Observable<number>;
  private stop$ : Subject<boolean>= new Subject;
  private _step$: Subject<Steps> = new Subject;
  private _timeLeft: number = 15 * 60;

  public get step$(): Subject<Steps> {
    return this._step$
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
    this._step$.next(Steps.RUNNING)
    this._timeLeft =  timeInMinutes * 60
    this.timer$.subscribe(value =>{
      this._timeLeft -= 1
      if (this._timeLeft <= 0) {
        this.completeTimer();
      }
    })
  }

  public completeTimer(){
    this.stop$.next(true);
    this._step$.next(Steps.SPAWNED);
  }

  public stopTimer(){
    this._step$.next(Steps.NOT_STARTED);
    this.stop$.next(true);
  }



}
