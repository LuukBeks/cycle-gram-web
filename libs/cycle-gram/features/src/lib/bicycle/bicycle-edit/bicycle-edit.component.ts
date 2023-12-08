import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BicycleService } from '../bicycle.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IBicycle, IUser } from '@cycle-gram-web-main/shared/api';
import { BicycleType } from '../bicycle.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'cycle-gram-web-main-bicycle-create',
  templateUrl: './bicycle-edit.component.html',
  styleUrls: ['./../bicycle-list/bicycle-list.component.css'],
})
export class BicycleEditComponent {
  bicycle: IBicycle = {
    id: '',
    bicycleName: '',
    Brand: '',
    weight: '',
    groupset: '',
    kleur: '',
    image: '',
    sort: BicycleType.RACE,
  };
  id: string | null = null;

  constructor(
    private bicycleService: BicycleService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Check if user is logged in
    const loggedInUserId = this.userService.getLoggedInUserId();
    if (!loggedInUserId) {
      this.router.navigate(['/login']);
    }

    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.bicycleService.read(this.id).subscribe((observable) => {
          this.bicycle = observable;
        });
      }
    });
  }

  editBicycle(): void {
    this.bicycleService.update(this.bicycle).subscribe(() => {
      this.router.navigate(['/bicycles']);
    });
  }

  createBicycle(): void {
    const loggedInUserId = this.userService.getLoggedInUserId();
    if (loggedInUserId) {
      // Use the correct method to get user asynchronously
      this.userService.read(loggedInUserId).subscribe(
        (user: IUser) => {
          if (user) {
            user.bicycles = user.bicycles || [];
            
            // Create the bicycle using bicycleService.create
            this.bicycleService.create(this.bicycle).subscribe(
              (createdBicycle) => {
                console.log('Bicycle created successfully:', createdBicycle);
  
                // Add the created bicycle to the user's bicycles array
                user.bicycles!.push(createdBicycle);
                
                this.userService.update(user).subscribe(
                  () => {
                    console.log('User updated successfully with the new bicycle');
                    this.router.navigate(['../..'], { relativeTo: this.route });
                  },
                  (updateError) => {
                    console.error('Error updating user:', updateError);
                  }
                );
              },
              (createError) => {
                console.error('Error creating bicycle:', createError);
              }
            );
          }
        },
        (error) => {
          console.error('Error reading user:', error);
        }
      );
    }
  }
  
  

  goBack(): void {
    this.router.navigate(['/bicycles']);
  }
}