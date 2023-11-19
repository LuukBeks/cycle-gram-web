import { Component } from '@angular/core';
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

export class UserEditComponent {
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

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if(this.id) {
        this.userService.read(this.id).subscribe((observable) => {this.user = observable});
      }
    });
  }

  editUser(): void {
    this.userService.update(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }

  createUser(): void {
    this.userService.create(this.user).subscribe(
      (createdUser) => {
        console.log('User created successfully:', createdUser);
        this.router.navigate(['../..'], {relativeTo: this.route});

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