// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'cycle-gram-web-main-login',
  templateUrl: './user-login.component.html',
  styleUrls: [],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };

  errorMessage: string | null = null;

  constructor(private authService: UserService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Login successful', response);
  
        // Navigate to the home page
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed', error);

        // Handle login error here (show a message, etc.)
        if (error.status === 401) {
          // Unauthorized - Incorrect password
          this.errorMessage = 'Incorrect email or password';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    );
  }
}