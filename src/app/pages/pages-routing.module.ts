import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoxComponent } from './box/box.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'box',
    component: BoxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
