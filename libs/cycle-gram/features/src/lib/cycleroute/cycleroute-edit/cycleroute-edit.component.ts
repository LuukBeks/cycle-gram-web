import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CycleRouteService } from '../cycleroute.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ICycleRoute } from '@cycle-gram-web-main/shared/api';
import { CycleRouteSort } from '../cycleroute.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'cycle-gram-web-main-cycleroute-create',
  templateUrl: './cycleroute-edit.component.html',
  styleUrls: [],
})
export class CycleRouteEditComponent {
  cycleroute: ICycleRoute = {
    id: '',
    routeName: '',
    distance: '',
    image: '',
    gpx: '',
    startAdres: '',
    sort: CycleRouteSort.MTB,
  };
  id: string | null = null;

  constructor(
    private cyclerouteService: CycleRouteService,
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
        this.cyclerouteService.read(this.id).subscribe((observable) => {
          this.cycleroute = observable;
        });
      }
    });
  }

  editCycleRoute(): void {
    console.log('Editing cycleroute:', this.cycleroute);
    this.cyclerouteService.update(this.cycleroute).subscribe(() => {
      this.router.navigate(['/cycleroute']);
    });
  }

  createCycleRoute(): void {
    console.log('Creating cycleroute:', this.cycleroute);
    this.cyclerouteService.create(this.cycleroute).subscribe(
      (createdCycleRoute) => {
        console.log('CycleRoute created successfully:', createdCycleRoute);
        this.router.navigate(['../..'], { relativeTo: this.route });
      },
      (error) => {
        console.error('Error creating CycleRoute:', error);
      }
    );
  }
  
  goBack(): void {
    this.router.navigate(['/cycleroute']);
  }
}