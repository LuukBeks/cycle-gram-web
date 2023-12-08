// cycleroute-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private cyclerouteService: CycleRouteService
  ) {}

  ngOnInit(): void {
    console.log('CycleRouteDetail.ngOnInit()');

    this.cycleroute$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.cyclerouteId = params.get('id');
        return this.cyclerouteService.list();
      }),
      switchMap(cycleroutes => {
        const selectedCycleRoute = cycleroutes?.find(cycleroute => cycleroute.id === this.cyclerouteId);
        return selectedCycleRoute ? of(selectedCycleRoute) : of(null);
      })
    );
  }
}
