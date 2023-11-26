import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Add this line
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


@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  declarations: [UserListComponent, UserDetailComponent, AboutComponent, UserEditComponent, UserDeleteComponent, BicycleListComponent, BicycleDetailComponent, BicycleEditComponent, BicycleDeleteComponent],
  providers: [UserService, BicycleService],
  exports: [UserListComponent, UserDetailComponent, AboutComponent, UserEditComponent, UserDeleteComponent, BicycleListComponent, BicycleDetailComponent, BicycleEditComponent, BicycleDeleteComponent]
})
export class FeaturesModule {}
