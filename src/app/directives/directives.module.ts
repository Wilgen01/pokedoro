import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickSoundDirective } from './clickSound/click-sound.directive';



@NgModule({
  declarations: [
    ClickSoundDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClickSoundDirective
  ]
})
export class DirectivesModule { }
