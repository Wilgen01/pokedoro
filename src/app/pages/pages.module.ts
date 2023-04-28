import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { TextBoxModule } from '../shared/components/text-box/text-box.module';
import { PomodoroService } from '../shared/services/pomodoro/pomodoro.service';
import { PlaygroundModule } from '../shared/components/playground/playground.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TextBoxModule,
    PlaygroundModule
  ],
  providers: [
    PomodoroService
  ]
})
export class PagesModule { }
