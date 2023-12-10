import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IBicycle } from '@cycle-gram-web-main/shared/api';
import { BicycleService } from '../bicycle.service';
import { UserService } from '../../user/user.service'; // Import UserService
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
  canEdit = false; // Add this property to store whether the user can edit the bicycle

  constructor(
    private route: ActivatedRoute,
    private bicycleService: BicycleService,
    private userService: UserService // Inject UserService
  ) {}

  ngOnInit(): void {
    console.log('BicycleDetail.ngOnInit()');

    const loggedInUserId = this.userService.getLoggedInUserId();

    this.bicycle$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.bicycleId = params.get('id');
        return this.bicycleService.list();
      }),
      switchMap(bicycles => {
        const selectedBicycle = bicycles?.find(bicycle => bicycle.id === this.bicycleId);
        this.userService.read(loggedInUserId).subscribe(user => {
          const bicycles = user.bicycles || []; // Provide a default value
          this.canEdit = bicycles.some(bicycle => bicycle.id === this.bicycleId); // Check if the bicycle is in the user's bicycles array
        });
        return selectedBicycle ? of(selectedBicycle) : of(null);
      })
    );
  }
}