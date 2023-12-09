import { Component, OnInit, OnDestroy } from '@angular/core';
import { BicycleService } from '../bicycle.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IBicycle } from '@cycle-gram-web-main/shared/api';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'cycle-gram-web-main-bicycle-list',
  templateUrl: './bicycle-list.component.html',
  styleUrls: ['./bicycle-list.component.css'],
})
export class BicycleListComponent implements OnInit, OnDestroy {
  bicycles: IBicycle[] | null = null;
  userId: string | null = null; // Added to store the user ID
  subscription: Subscription | undefined = undefined;
  loggedInUserId: string | null = null;

  constructor(private bicycleService: BicycleService, private userService: UserService ) {}

  ngOnInit(): void {
    // get logged in user
    this.loggedInUserId = this.userService.getLoggedInUserId();
    this.subscription = this.bicycleService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.bicycles = results;
  
      // Check if results is not null before using it
      if (results) {
        // Loop over each bicycle and find the owner
        for (const bicycle of results) {
          this.bicycleService.findUserByBicycleId(bicycle.id).subscribe((userId) => {
            console.log(`Bicycle ID: ${bicycle.id}, User ID: ${userId}`);
            if (userId) {
              // Store the owner's ID in the bicycle object
              bicycle.ownerId = userId;
            }
          });
        }
      }
    });
  }
  
  isOwner(bicycle: IBicycle): boolean {
    // Return true if the logged in user is the owner of the bicycle
    return bicycle.ownerId === this.loggedInUserId;
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
