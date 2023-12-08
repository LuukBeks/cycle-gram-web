import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CycleEventService } from '../cycleevent.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ICycleEvent } from '@cycle-gram-web-main/shared/api';


@Component({
  selector: 'cycle-gram-web-main-cycleevent-delete',
  templateUrl: './cycleevent-delete.component.html',
  styleUrls: [],
})
export class CycleEventDeleteComponent implements OnInit {
  cycleevent = {} as ICycleEvent;
  id: string | null = null;

  constructor(
    private cycleeventService: CycleEventService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.cycleeventService.read(this.id).subscribe((observable) => {
          this.cycleevent = observable;
        });
      }
    });
  }

  deleteCycleEvent(): void {
    if (this.id) {
      this.cycleeventService.delete(this.cycleevent).subscribe(
        () => {
          console.log('CycleEvent deleted successfully');
          this.router.navigate(['/cycleevent']);
        },
        (error) => {
          console.error('Error deleting cycleevent:', error);
        }
      );
    } else {
      console.error('CycleEvent id is missing for deletion.');
    }
  }
  

  goBack(): void {
    this.router.navigate(['/cycleevent']);
  }
}