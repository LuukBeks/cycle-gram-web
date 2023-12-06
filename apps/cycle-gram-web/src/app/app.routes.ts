import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  UserEditComponent,
  UserDeleteComponent,
  UserDetailComponent,
  AboutComponent,
  UserListComponent,
  BicycleListComponent,
  BicycleDetailComponent,
  BicycleEditComponent,
  BicycleDeleteComponent,
  LoginComponent,
} from '@cycle-gram-web-main/cycle-gram/features';

export const appRoutes: Route[] = [
  { //about
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent,
  },
  { //users
    path: 'users',
    pathMatch: 'full',
    component: UserListComponent,
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
  { //bicycle
    path: 'bicycles', 
    pathMatch: 'full', 
    component: BicycleListComponent 
  },
  { 
    path: 'bicycles/:id', 
    pathMatch: 'full', 
    component: BicycleDetailComponent 
  },    
  { 
    path: 'bicycles/:id/edit', 
    pathMatch: 'full', 
    component: BicycleEditComponent 
  },
  { 
    path: 'bicycles/:id/delete', 
    pathMatch: 'full', 
    component: BicycleDeleteComponent 
  },
  { 
    path: 'bicycle/create', 
    pathMatch: 'full',
    component: BicycleEditComponent 
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: UserEditComponent,
    data: { createMode: true },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
