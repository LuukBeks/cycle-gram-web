import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service'; // Updated service import
import { IUser } from '@cycle-gram-web-main/shared/api'; // Updated interface import
import { Subscription } from 'rxjs';

@Component({
    selector: 'cycle-gram-web-main-user-list', // Updated selector
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'], // Updated style URL
})
export class UserListComponent implements OnInit, OnDestroy { // Updated class name
    users: IUser[] | null = null; // Updated interface
    subscription: Subscription | undefined = undefined;

    constructor(private userService: UserService) { // Updated service injection
    }

    ngOnInit(): void {
        this.subscription = this.userService.list().subscribe((results) => { // Updated service method
            console.log(`results: ${results}`);
            this.users = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
