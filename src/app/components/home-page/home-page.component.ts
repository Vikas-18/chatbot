import { Component } from '@angular/core';
import { worksData, WorkItem } from '../../data/works-data';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  services: WorkItem[] = worksData;
}
