import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';
import { IUser } from '@cycle-gram-web-main/shared/api';
import { UserSort } from '../user.model';

@Component({
  selector: 'cycle-gram-web-main-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['../user-list/user-list.component.css'],
})
export class UserDeleteComponent {
  user: IUser = {
    id: '',
    name: '',
    dob: new Date(),
    email: '',
    phoneNumber: '',
    password: '',
    image: '',
    sort: UserSort.Other,
  };
  id: string | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.userService.read(this.id).subscribe((observable) => {
          this.user = observable;
        });
      }
    });
  }

  deleteUser(): void {
    if (this.id) {
      this.userService.delete(this.user).subscribe(
        () => {
          console.log('User deleted successfully');
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    } else {
      console.error('User id is missing for deletion.');
    }
  }
  

  goBack(): void {
    this.router.navigate(['/users']);
  }
}