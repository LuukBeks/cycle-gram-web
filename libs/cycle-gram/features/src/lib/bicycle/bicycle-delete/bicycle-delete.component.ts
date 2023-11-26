import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { BicycleService } from '../bicycle.service';
import { IBicycle } from '@cycle-gram-web-main/shared/api';
import { BicycleType } from '../bicycle.model';

@Component({
  selector: 'cycle-gram-web-main-bicycle-delete',
  templateUrl: './bicycle-delete.component.html',
  styleUrls: ['../bicycle-list/bicycle-list.component.css'],
})
export class BicycleDeleteComponent {
  bicycle: IBicycle = {
    id: '',
    bicycleName: '',
    Brand: '',
    weight: '',
    groupset: '',
    kleur: '',
    image: '',
    sort: BicycleType.RACE,
  };
  id: string | null = null;

  constructor(
    private bicycleService: BicycleService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.bicycleService.read(this.id).subscribe((observable) => {
          this.bicycle = observable;
        });
      }
    });
  }

  deleteBicycle(): void {
    if (this.id) {
      this.bicycleService.delete(this.bicycle).subscribe(
        () => {
          console.log('Bicycle deleted successfully');
          this.router.navigate(['/bicycles']);
        },
        (error) => {
          console.error('Error deleting bicycle:', error);
        }
      );
    } else {
      console.error('Bicycle id is missing for deletion.');
    }
  }
  

  goBack(): void {
    this.router.navigate(['/bicycles']);
  }
}