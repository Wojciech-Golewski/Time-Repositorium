import { Routes, RouterModule } from '@angular/router';
import { MainTableComponent } from './components/main-table/main-table.component';
import { HomePage } from './home.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'main-table',
        pathMatch: 'full'
      },
      {
        path: 'main-table',
        component: MainTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
