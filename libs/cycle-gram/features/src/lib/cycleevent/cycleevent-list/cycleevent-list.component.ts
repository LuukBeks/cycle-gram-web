import { Component, OnInit, OnDestroy } from '@angular/core';
import { CycleEventService } from '../cycleevent.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ICycleEvent, ICycleRoute } from '@cycle-gram-web-main/shared/api';
import { Subscription } from 'rxjs';
import { CycleRouteService } from '../../cycleroute/cycleroute.service';
import { NgZone } from '@angular/core';
import { UserService } from '../../user/user.service';


@Component({
  selector: 'cycle-gram-web-main-cycleevent-list',
  templateUrl: './cycleevent-list.component.html',
  styleUrls: [],
})
export class CycleEventListComponent implements OnInit, OnDestroy {
  cycleevents: ICycleEvent[] | null = null;
  cycleeventId: string | null = null;
  subscription: Subscription | undefined = undefined;
  cycleRoute: ICycleRoute | null = null;
  cycleRouteName: string | undefined;

  constructor(
    private cycleeventService: CycleEventService,
    private cycleRouteService: CycleRouteService,
    private zone: NgZone,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.cycleeventService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.cycleevents = results;

      // Assuming cycleevents is an array, you can use the first element's id
      if (this.cycleevents && this.cycleevents.length > 0) {
        this.getCycleRouteName(this.cycleevents[0].routes);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  getCycleRouteName(cycleRouteId: string): void {
    this.zone.runOutsideAngular(() => {
      this.cycleRouteService.read(cycleRouteId).subscribe(
        (observable) => {
          this.cycleRoute = observable;
          this.cycleRouteName = this.cycleRoute?.routeName;
          this.zone.run(() => {}); // Handmatig terugkeren naar de Angular-zone
        },
        (error) => {
          console.error('Error getting cycle route:', error);
        }
      );
    });
  }


  participate(cycleevent: ICycleEvent): void {
    // Get the logged-in user
    const loggedInUser = this.userService.getLoggedInUser();
  
    // Check if loggedInUser is not null
    if (loggedInUser) {
      // Check if participants is defined
      if (cycleevent.participants) {
        // Check if the user has already participated
        const index = cycleevent.participants.findIndex(participant => participant.id === loggedInUser.id);
        if (index === -1) {
          // Add the user to the participants list
          cycleevent.participants.push(loggedInUser);
  
          // Update the cycle event
          this.cycleeventService.update(cycleevent).subscribe(updatedCycleEvent => {
            console.log('Updated cycle event:', updatedCycleEvent);
          });
        } else {
          console.error('User has already participated');
        }
      } else {
        // If participants is not defined, initialize it with the logged-in user
        cycleevent.participants = [loggedInUser];
  
        // Update the cycle event
        this.cycleeventService.update(cycleevent).subscribe(updatedCycleEvent => {
          console.log('Updated cycle event:', updatedCycleEvent);
        });
      }
    } else {
      console.error('No user is logged in');
    }
  }

  unparticipate(cycleevent: ICycleEvent): void {
    // Get the logged-in user
    const loggedInUser = this.userService.getLoggedInUser();
  
    // Check if loggedInUser is not null
    if (loggedInUser) {
      // Check if participants is defined
      if (cycleevent.participants) {
        // Check if the user has participated
        const index = cycleevent.participants.findIndex(participant => participant.id === loggedInUser.id);
        if (index !== -1) {
          // Remove the user from the participants list
          cycleevent.participants.splice(index, 1);
  
          // Update the cycle event
          this.cycleeventService.update(cycleevent).subscribe(updatedCycleEvent => {
            console.log('Updated cycle event:', updatedCycleEvent);
          });
        } else {
          console.error('User has not participated');
        }
      } else {
        console.error('No participants in this event');
      }
    } else {
      console.error('No user is logged in');
    }
  }
  
  isParticipated(cycleevent: ICycleEvent): boolean {
    // Get the logged-in user
    const loggedInUser = this.userService.getLoggedInUser();
  
    // Check if loggedInUser is not null and participants is defined
    if (loggedInUser && cycleevent.participants) {
      // Check if the user has participated
      return cycleevent.participants.some(participant => participant.id === loggedInUser.id);
    }
  
    return false;
  }

  isOwner(cycleevent: ICycleEvent): boolean {
    const loggedInUserId = this.userService.getLoggedInUserId();
    return cycleevent.createdById === loggedInUserId;
  }

}
