import { Component } from '@angular/core';

@Component({
  selector: 'cycle-gram-web-main-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  title = 'About';
  imagePath?: string;
  constructor() {
    this.imagePath = 'assets/images/cycle-gram-erd.png';
  }
}