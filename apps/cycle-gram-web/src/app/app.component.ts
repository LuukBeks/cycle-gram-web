import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { FeaturesModule } from '@cycle-gram-web-main/cycle-gram/features';
import { UiModule } from '@cycle-gram-web-main/ui';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  standalone: true,
  imports: [RouterModule, FeaturesModule, RouterLink, RouterOutlet, UiModule, HttpClientModule],
  selector: 'cycle-gram-web-main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cycle-gram-web';
  imagePath?: string;
  constructor() {
    this.imagePath = 'assets/images/cycle-gram-erd.png';
  }
}
