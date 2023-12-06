// header.component.ts
import { Component } from '@angular/core';
import { UserService } from '@cycle-gram-web-main/cycle-gram/features';

@Component({
  selector: 'cycle-gram-web-main-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private authService: UserService) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }
}