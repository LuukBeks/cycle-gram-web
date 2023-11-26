import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BicycleService } from '../bicycle.service';
import { IBicycle } from '@cycle-gram-web-main/shared/api';
import { BicycleType } from '../bicycle.model';

@Component({
  selector: 'cycle-gram-web-main-bicycle-create',
  templateUrl: './bicycle-edit.component.html',
  styleUrls: ['./../bicycle-list/bicycle-list.component.css'],
})

export class BicycleEditComponent {
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

  constructor(private bicycleService: BicycleService, private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if(this.id) {
        this.bicycleService.read(this.id).subscribe((observable) => {this.bicycle = observable});
      }
    });
  }

  editBicycle(): void {
    this.bicycleService.update(this.bicycle).subscribe(() => {
      this.router.navigate(['/bicycles']);
    });
  }

  createBicycle(): void {
    this.bicycleService.create(this.bicycle).subscribe(
      (createdBicycle) => {
        console.log('Bicycle created successfully:', createdBicycle);
        this.router.navigate(['../..'], {relativeTo: this.route});

      },
      (error) => {
        console.error('Error creating bicycle:', error);
      }
    );
  } 
  
  goBack(): void {
    this.router.navigate(['/bicycles']);
  }
}