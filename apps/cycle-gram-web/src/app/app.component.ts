import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from '@flowbite';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { FeaturesModule } from '@cycle-gram-web-main/cycle-gram/features';


@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, FeaturesModule],
  selector: 'cycle-gram-web-main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'cycle-gram-web';

  ngOnInit() : void {
    initFlowbite();
  }
}
