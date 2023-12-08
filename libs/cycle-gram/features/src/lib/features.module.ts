import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserService } from './user/user.service';
import { AboutComponent } from './about/about.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import { BicycleListComponent } from './bicycle/bicycle-list/bicycle-list.component';
import { BicycleDetailComponent } from './bicycle/bicycle-detail/bicycle-detail.component';
import { BicycleEditComponent } from './bicycle/bicycle-edit/bicycle-edit.component';
import { BicycleDeleteComponent } from './bicycle/bicycle-delete/bicycle-delete.component';
import { BicycleService } from './bicycle/bicycle.service';
import { LoginComponent } from './user/user-login/user-login.component';
import { CycleRouteListComponent } from './cycleroute/cycleroute-list/cycleroute-list.component';
import { CycleRouteDetailComponent } from './cycleroute/cycleroute-detail/cycleroute-detail.component';
import { CycleRouteEditComponent } from './cycleroute/cycleroute-edit/cycleroute-edit.component';
import { CycleRouteDeleteComponent } from './cycleroute/cycleroute-delete/cycleroute-delete.component';
import { CycleRouteService } from './cycleroute/cycleroute.service';
import { CycleEventDeleteComponent } from './cycleevent/cycleevent-delete/cycleevent-delete.component';
import { CycleEventListComponent } from './cycleevent/cycleevent-list/cycleevent-list.component';
import { CycleEventDetailComponent } from './cycleevent/cycleevent-detail/cycleevent-detail.component';
import { CycleEventEditComponent } from './cycleevent/cycleevent-edit/cycleevent-edit.component';
import { CycleEventService } from './cycleevent/cycleevent.service';


@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  declarations: [
    UserListComponent,
    UserDetailComponent,
    AboutComponent,
    UserEditComponent,
    UserDeleteComponent,
    BicycleListComponent,
    BicycleDetailComponent,
    BicycleEditComponent,
    LoginComponent,
    BicycleDeleteComponent,
    CycleRouteListComponent,
    CycleRouteDetailComponent,
    CycleRouteEditComponent,
    CycleRouteDeleteComponent,
    CycleEventListComponent,
    CycleEventDetailComponent,
    CycleEventEditComponent,
    CycleEventDeleteComponent,
  ],
  providers: [UserService, BicycleService, CycleRouteService, CycleEventService],
  exports: [
    UserListComponent,
    UserDetailComponent,
    AboutComponent,
    UserEditComponent,
    UserDeleteComponent,
    BicycleListComponent,
    BicycleDetailComponent,
    BicycleEditComponent,
    LoginComponent,
    BicycleDeleteComponent,
    CycleRouteListComponent,
    CycleRouteDetailComponent,
    CycleRouteEditComponent,
    CycleRouteDeleteComponent,
    CycleEventListComponent,
    CycleEventDetailComponent,
    CycleEventEditComponent,
    CycleEventDeleteComponent,
  ],
})
export class FeaturesModule {}
