import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { CycleRouteService } from '../cycleroute.service';
import { ICycleRoute } from '@cycle-gram-web-main/shared/api';
import { CycleRouteSort } from '../cycleroute.model';

@Component({
  selector: 'cycle-gram-web-main-cycleroute-delete',
  templateUrl: './cycleroute-delete.component.html',
  styleUrls: [],
})
export class CycleRouteDeleteComponent {
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
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.cyclerouteService.read(this.id).subscribe((observable) => {
          this.cycleroute = observable;
        });
      }
    });
  }

  deleteCycleRoute(): void {
    if (this.id) {
      this.cyclerouteService.delete(this.cycleroute).subscribe(
        () => {
          console.log('CycleRoute deleted successfully');
          this.router.navigate(['/cycleroute']);
        },
        (error) => {
          console.error('Error deleting cycleroute:', error);
        }
      );
    } else {
      console.error('CycleRoute id is missing for deletion.');
    }
  }
  

  goBack(): void {
    this.router.navigate(['/cycleroute']);
  }
}