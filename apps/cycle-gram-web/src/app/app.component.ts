import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { FeaturesModule } from '@cycle-gram-web-main/cycle-gram/features';
import { UiModule } from '@cycle-gram-web-main/ui';


@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, FeaturesModule, RouterLink, RouterOutlet, UiModule],
  selector: 'cycle-gram-web-main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cycle-gram-web';
}
