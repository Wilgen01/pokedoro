import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';



@NgModule({
  declarations: [PlaygroundComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PlaygroundComponent
  ]
})
export class PlaygroundModule { }
