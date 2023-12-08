import { Component, OnInit, OnDestroy } from '@angular/core';
import { CycleEventService } from '../cycleevent.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ICycleEvent, ICycleRoute } from '@cycle-gram-web-main/shared/api';
import { Subscription } from 'rxjs';
import { CycleRouteService } from '../../cycleroute/cycleroute.service';
import { NgZone } from '@angular/core';


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
    private zone: NgZone
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
}
