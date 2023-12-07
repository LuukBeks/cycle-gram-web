import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { IUser } from '@cycle-gram-web-main/shared/api';
import { UserSort } from '../user.model';

@Component({
  selector: 'cycle-gram-web-main-user-create',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./../user-list/user-list.component.css'],
})
export class UserEditComponent implements OnInit {
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
  loggedInUserId: string | null = null; // Add a property to store the logged-in user ID

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit(): void {
    // Fetch the logged-in user details
    this.loggedInUserId = this.userService.getLoggedInUserId();

    this.route.data.subscribe((data) => {
      const createMode = data['createMode'];

      if (createMode) {
        // Handle create mode

      } else {
        // Handle edit mode
        this.route.paramMap.subscribe((params) => {
          this.id = params.get('id');
          if (this.id) {
            console.log('Editing user:', this.id);
            this.userService.read(this.id).subscribe((observable) => {
              this.user = observable;
              // Check if the logged-in user is the same as the user being edited
              if (this.loggedInUserId !== this.user.id) {
                // Redirect to an unauthorized access page or display an error message
                this.router.navigate(['/users']);
              }
            });
          }   
        });
      }
    });
  }

  editUser(): void {
    this.userService.update(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }

  createUser(): void {
    console.log('Creating user:', this.user);
    this.userService.create(this.user).subscribe(
      (createdUser) => {
        console.log('User created successfully:', createdUser);
        this.router.navigate(['../..'], { relativeTo: this.route });
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
