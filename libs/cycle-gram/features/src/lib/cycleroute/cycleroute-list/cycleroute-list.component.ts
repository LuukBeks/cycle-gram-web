import { Component, OnInit, OnDestroy } from '@angular/core';
import { CycleRouteService } from '../cycleroute.service'; // Updated service import
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ICycleRoute } from '@cycle-gram-web-main/shared/api'; // Updated interface import
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';

@Component({
    selector: 'cycle-gram-web-main-cycleroute-list', // Updated selector
    templateUrl: './cycleroute-list.component.html',
    styleUrls: [],
})
export class CycleRouteListComponent implements OnInit, OnDestroy {
    cycleroutes: ICycleRoute[] | null = null;
    subscription: Subscription | undefined = undefined;
    loggedInUserId: string | null = null;
  
    constructor(private cyclerouteService: CycleRouteService, private userService: UserService ) {}
  
    ngOnInit(): void {
      // get logged in user
      this.loggedInUserId = this.userService.getLoggedInUserId();
      this.subscription = this.cyclerouteService.list().subscribe((results) => {
        console.log(`results: ${results}`);
        this.cycleroutes = results;
    
        // Check if results is not null before using it
        if (results) {
          // Loop over each cycle route and find the owner
          for (const cycleRoute of results) {
            this.cyclerouteService.findUserByCycleRouteId(cycleRoute.id).subscribe((userId) => {
              console.log(`Cycle Route ID: ${cycleRoute.id}, User ID: ${userId}`);
              if (userId) {
                // Store the owner's ID in the cycle route object
                cycleRoute.ownerId = userId;
                console.log(`ownerId: ${cycleRoute.ownerId}, loggedInUserId: ${this.loggedInUserId}`);
              }
            });
          }
        }
      });
    }
    
    isOwner(cycleRoute: ICycleRoute): boolean {
      // Return true if the logged in user is the owner of the cycle route
      return cycleRoute.ownerId === this.loggedInUserId;
    }
  
    ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
    }
  }
