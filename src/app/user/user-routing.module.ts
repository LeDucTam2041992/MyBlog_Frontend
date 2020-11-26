import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PictureComponent} from './picture/picture.component';
import {UserHomeComponent} from './user-home/user-home.component';
import {MaterialComponent} from './material/material.component';

const routes: Routes = [
  {
    path: '',
    component: UserHomeComponent,
    children: [
      {
        path: 'picture',
        component: PictureComponent
      },
      {
        path: 'material',
        component: MaterialComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
