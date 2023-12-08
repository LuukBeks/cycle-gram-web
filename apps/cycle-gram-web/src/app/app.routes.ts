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
  CycleRouteDeleteComponent,
  CycleRouteDetailComponent,
  CycleRouteEditComponent,
  CycleRouteListComponent,
  CycleEventListComponent,
  CycleEventDetailComponent,
  CycleEventEditComponent,
  CycleEventDeleteComponent,
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
  { //auth
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  { //cycleroute
    path: 'cycleroute',
    pathMatch: 'full',
    component: CycleRouteListComponent,
  },
  {
    path: 'cycleroute/create',
    pathMatch: 'full',
    component: CycleRouteEditComponent,
  },
  {
    path: 'cycleroute/:id',
    pathMatch: 'full',
    component: CycleRouteDetailComponent,
  },
  {
    path: 'cycleroute/:id/edit',
    pathMatch: 'full',
    component: CycleRouteEditComponent,
  },
  {
    path: 'cycleroute/:id/delete',
    pathMatch: 'full',
    component: CycleRouteDeleteComponent,
  },
  { //cycleevent
    path: 'cycleevent',
    pathMatch: 'full',
    component: CycleEventListComponent,
  },
  {
    path: 'cycleevent/create',
    pathMatch: 'full',
    component: CycleEventEditComponent,
  },
  {
    path: 'cycleevent/:id/participate',
    pathMatch: 'full',
    component: CycleEventEditComponent,
  },
  {
    path: 'cycleevent/:id',
    pathMatch: 'full',
    component: CycleEventDetailComponent,
  },
  {
    path: 'cycleevent/:id/edit',
    pathMatch: 'full',
    component: CycleEventEditComponent,
  },
  {
    path: 'cycleevent/:id/delete',
    pathMatch: 'full',
    component: CycleEventDeleteComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
