import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  @Input() review: any;

  isFullText: boolean = false;
  buttonText: string = 'Show More';

  toggleText(): void {
    this.isFullText = !this.isFullText;
    this.buttonText = this.isFullText ? 'Show Less' : 'Show More';
  }
}
