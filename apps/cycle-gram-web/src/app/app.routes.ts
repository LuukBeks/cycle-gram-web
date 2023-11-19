import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  UserEditComponent,
  UserDeleteComponent,
  UserDetailComponent,
  AboutComponent,
  UserListComponent,
} from '@cycle-gram-web-main/cycle-gram/features';

export const appRoutes: Route[] = [
  {
    path: 'users',
    pathMatch: 'full',
    component: UserListComponent,
  },
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent,
  },
  {
    path: 'users/:id',
    pathMatch: 'full',
    component: UserDetailComponent,
  },
  {
    path: 'users/:id/edit',
    pathMatch: 'full',
    component: UserEditComponent,
  },
  {
    path: 'users/:id/delete',
    pathMatch: 'full',
    component: UserDeleteComponent,
  },
  { 
    path: 'user/create', 
    pathMatch: 'full', 
    component: UserEditComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
