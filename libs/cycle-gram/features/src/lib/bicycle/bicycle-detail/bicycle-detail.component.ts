// bicycle-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBicycle } from '@cycle-gram-web-main/shared/api';
import { BicycleService } from '../bicycle.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cycle-gram-web-main-bicycle-detail',
  templateUrl: './bicycle-detail.component.html',
  styleUrls: ['../bicycle-list/bicycle-list.component.css'],
})
export class BicycleDetailComponent implements OnInit {
  bicycleId: string | null = null;
  bicycle$: Observable<IBicycle | null> | undefined;

  constructor(
    private route: ActivatedRoute,
    private bicycleService: BicycleService
  ) {}

  ngOnInit(): void {
    console.log('BicycleDetail.ngOnInit()');

    this.bicycle$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.bicycleId = params.get('id');
        return this.bicycleService.list();
      }),
      switchMap(bicycles => {
        const selectedBicycle = bicycles?.find(bicycle => bicycle.id === this.bicycleId);
        return selectedBicycle ? of(selectedBicycle) : of(null);
      })
    );
  }
}
