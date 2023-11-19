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

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule], // Add FormsModule
  declarations: [UserListComponent, UserDetailComponent, AboutComponent, UserEditComponent, UserDeleteComponent],
  providers: [UserService],
  exports: [UserListComponent, UserDetailComponent, AboutComponent, UserEditComponent, UserDeleteComponent]
})
export class FeaturesModule {}
