import { Component, OnInit, OnDestroy } from '@angular/core';
import { BicycleService } from '../bicycle.service'; // Updated service import
import { IBicycle } from '@cycle-gram-web-main/shared/api'; // Updated interface import
import { Subscription } from 'rxjs';

@Component({
    selector: 'cycle-gram-web-main-bicycle-list', // Updated selector
    templateUrl: './bicycle-list.component.html',
    styleUrls: ['./bicycle-list.component.css'], // Updated style URL
})
export class BicycleListComponent implements OnInit, OnDestroy { // Updated class name
    bicycles: IBicycle[] | null = null; // Updated interface
    bicycleId: string | null = null;
    subscription: Subscription | undefined = undefined;

    constructor(private bicycleService: BicycleService) { // Updated service injection
    }

    ngOnInit(): void {
        this.subscription = this.bicycleService.list().subscribe((results) => { // Updated service method
            console.log(`results: ${results}`);
            this.bicycles = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
