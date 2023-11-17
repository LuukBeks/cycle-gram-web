import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserService } from './user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterLink } from '@angular/router';

// about, edit, create nog toevoegen

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule, RouterLink],
  declarations: [UserListComponent, UserDetailComponent],
  providers: [UserService],
  exports: [UserListComponent, UserDetailComponent]
})
export class FeaturesModule {}