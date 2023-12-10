import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/user.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ICycleRoute } from '@cycle-gram-web-main/shared/api';
import { CycleRouteService } from '../cycleroute.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cycle-gram-web-main-cycleroute-detail',
  templateUrl: './cycleroute-detail.component.html',
  styleUrls: [],
})
export class CycleRouteDetailComponent implements OnInit {
  cyclerouteId: string | null = null;
  cycleroute$: Observable<ICycleRoute | null> | undefined;
  canEdit = false; // Add this property to store whether the user can edit the cycle route

  constructor(
    private route: ActivatedRoute,
    private cyclerouteService: CycleRouteService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('CycleRouteDetail.ngOnInit()');

    const loggedInUserId = this.userService.getLoggedInUserId();

    this.cycleroute$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.cyclerouteId = params.get('id');
        return this.cyclerouteService.list();
      }),
      switchMap(cycleroutes => {
        console.log('CycleRouteDetail.ngOnInit(): cycleroutes', cycleroutes);
        const selectedCycleRoute = cycleroutes?.find(cycleroute => cycleroute.id === this.cyclerouteId);
        this.userService.read(loggedInUserId).subscribe(user => {
          const cycleRoutes = user.cycleRoutes || []; // Provide a default value
          this.canEdit = cycleRoutes.some(route => route.id === this.cyclerouteId); // Check if the cycle route is in the user's cycleRoutes array
        });
        return selectedCycleRoute ? of(selectedCycleRoute) : of(null);
      })
    );
  }
}