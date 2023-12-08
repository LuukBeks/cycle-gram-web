// cycleevent-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ICycleEvent } from '@cycle-gram-web-main/shared/api';
import { CycleEventService } from '../cycleevent.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cycle-gram-web-main-cycleevent-detail',
  templateUrl: './cycleevent-detail.component.html',
  styleUrls: [],
})
export class CycleEventDetailComponent implements OnInit {
  cycleeventId: string | null = null;
  cycleevent$: Observable<ICycleEvent | null> | undefined;

  constructor(
    private route: ActivatedRoute,
    private cycleeventService: CycleEventService
  ) {}

  ngOnInit(): void {
    console.log('CycleEventDetail.ngOnInit()');

    this.cycleevent$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.cycleeventId = params.get('id');
        return this.cycleeventService.list();
      }),
      switchMap(cycleevents => {
        const selectedCycleEvent = cycleevents?.find(cycleevent => cycleevent.id === this.cycleeventId);
        return selectedCycleEvent ? of(selectedCycleEvent) : of(null);
      })
    );
  }
}
