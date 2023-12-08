import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CycleEventService } from '../cycleevent.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ICycleEvent } from '@cycle-gram-web-main/shared/api'; //IUser toevoegen
import { UserService } from '../../user/user.service';
import { CycleRoute } from '../../cycleroute/cycleroute.model';
import { CycleRouteService } from '../../cycleroute/cycleroute.service';

@Component({
  selector: 'cycle-gram-web-main-cycleevent-create',
  templateUrl: './cycleevent-edit.component.html',
  styleUrls: [],
})
export class CycleEventEditComponent implements OnInit {
  cycleevent: ICycleEvent = {} as ICycleEvent;
  id: string | null = null;
  cycleRoutes!: CycleRoute[];
  selectedCycleRouteId!: string;


  constructor(
    private cycleeventService: CycleEventService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService,
    private cycleRouteService: CycleRouteService // Inject cycleRouteService
  ) {}

  ngOnInit(): void {
    // Check if user is logged in
    const loggedInUserId = this.userService.getLoggedInUserId();
    if (!loggedInUserId) {
      this.router.navigate(['/login']);
    }

    // Get cycleRoutes from cycleeventService
    this.cycleRouteService.readAll().subscribe((cycleRoutes) => {
      this.cycleRoutes = cycleRoutes;
    });
    
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.cycleeventService.read(this.id).subscribe((observable) => {
          this.cycleevent = observable;
        });
      }
    });
  }

  editCycleEvent(): void {
    console.log('Editing cycleevent:', this.cycleevent);
    this.cycleeventService.update(this.cycleevent).subscribe(() => {
      this.router.navigate(['/cycleevent']);
    });
  }

  createCycleEvent(): void {
    this.cycleevent.createdById = this.userService.getLoggedInUserId() as string;

    console.log('Creating cycleEvent:', this.cycleevent);
    this.cycleeventService.create(this.cycleevent).subscribe(
      (createdCycleEvent) => {
        console.log('cycleEvent created successfully:', createdCycleEvent);
        this.router.navigate(['../..'], { relativeTo: this.route });
      },
      (error) => {
        console.error('Error creating CycleEvent:', error);
      }
    );
  }  
  
  goBack(): void {
    this.router.navigate(['/cycleevent']);
  }
}