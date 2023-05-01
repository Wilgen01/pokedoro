import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-text-box[text]',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit, OnChanges , OnDestroy{

  private destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() text: string = ''
  public textToShow = '';
  
  
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text']) {
      this.animateText();
      this.textToShow = '';
    }
    
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private animateText() {
    const typing$: Observable<number> = interval(70);
    const textLength = this.text.length;

    typing$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((i) => {
        if (i < textLength) {
          this.textToShow += this.text.charAt(i);
        } else {
          this.destroy$.next(true);
          this.destroy$.complete();
        }
      });
  }

}
