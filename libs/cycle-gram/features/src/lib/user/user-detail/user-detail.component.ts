// user-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '@cycle-gram-web-main/shared/api';
import { UserService } from '../user.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cycle-gram-web-main-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['../user-list/user-list.component.css'],
})
export class UserDetailComponent implements OnInit {
  userId: string | null = null;
  user$: Observable<IUser | null> | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('UserDetail.ngOnInit()');

    this.user$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.userId = params.get('id');
        return this.userService.list();
      }),
      switchMap(users => {
        const selectedUser = users?.find(user => user.id === this.userId);
        return selectedUser ? of(selectedUser) : of(null);
      })
    );
  }
}
