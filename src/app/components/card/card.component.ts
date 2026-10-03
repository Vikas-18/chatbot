import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() animation = 'fade-left';
  @Input() content = '';
  @Input() images = '';
  @Input() float = 'animation-left';
}
