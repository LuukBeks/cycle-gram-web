import { Component, OnInit, OnDestroy } from '@angular/core';
import { CycleRouteService } from '../cycleroute.service'; // Updated service import
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ICycleRoute } from '@cycle-gram-web-main/shared/api'; // Updated interface import
import { Subscription } from 'rxjs';

@Component({
    selector: 'cycle-gram-web-main-cycleroute-list', // Updated selector
    templateUrl: './cycleroute-list.component.html',
    styleUrls: [],
})
export class CycleRouteListComponent implements OnInit, OnDestroy { // Updated class name
    cycleroutes: ICycleRoute[] | null = null; // Updated interface
    cyclerouteId: string | null = null;
    subscription: Subscription | undefined = undefined;

    constructor(private cyclerouteService: CycleRouteService) { // Updated service injection
    }

    ngOnInit(): void {
        this.subscription = this.cyclerouteService.list().subscribe((results) => { // Updated service method
            console.log(`results: ${results}`);
            this.cycleroutes = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
