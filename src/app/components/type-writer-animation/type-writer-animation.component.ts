import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-type-writer-animation',
  templateUrl: './type-writer-animation.component.html',
  styleUrls: ['./type-writer-animation.component.css']
})
export class TypeWriterAnimationComponent implements OnInit, OnDestroy {
  strings: string[] = [
    'The Innovation Ninjas',
    'Presents',
    'The Hostel ChatBot'
  ];

  displayText = '';
  private currentStringIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private timeoutId: any;

  ngOnInit(): void {
    this.type();
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private type(): void {
    const fullString = this.strings[this.currentStringIndex];

    if (this.isDeleting) {
      this.displayText = fullString.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
    } else {
      this.displayText = fullString.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
    }

    let typeSpeed = this.isDeleting ? 40 : 70;

    if (!this.isDeleting && this.displayText === fullString) {
      // Pause at end of string
      typeSpeed = 1500;
      this.isDeleting = true;
    } else if (this.isDeleting && this.displayText === '') {
      this.isDeleting = false;
      this.currentStringIndex = (this.currentStringIndex + 1) % this.strings.length;
      typeSpeed = 500;
    }

    this.timeoutId = setTimeout(() => this.type(), typeSpeed);
  }
}
