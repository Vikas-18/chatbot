import { Component } from '@angular/core';
import { memberData, TeamMember } from '../../data/member-data';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  members: TeamMember[] = memberData;
}
