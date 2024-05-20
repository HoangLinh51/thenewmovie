import { Component, Input, ViewChild,ElementRef  } from '@angular/core';

@Component({
  selector: 'app-similiar',
  templateUrl: './similiar.component.html',
  styleUrls: ['./similiar.component.scss'],
})
export class SimiliarComponent {
  @ViewChild('listContainer', { static: true }) listContainer!: ElementRef;
  @Input() similarMovies: any;
  @Input() imgUrl!: string;

  scrollLeft() {
    this.listContainer.nativeElement.scrollBy({
      left: -720,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.listContainer.nativeElement.scrollBy({
      left: 720,
      behavior: 'smooth',
    });
  }
}
