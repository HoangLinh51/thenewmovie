import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.scss']
})
export class TvListComponent {
  @ViewChild('listContainer', { static: true }) listContainer!: ElementRef;
  @Input() listMovie:any
  @Input() list!: string
    
  imgUrl = 'https://image.tmdb.org/t/p/original';
  scrollLeft() {
    this.listContainer.nativeElement.scrollBy({
      left: -630,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.listContainer.nativeElement.scrollBy({
      left: 630,
      behavior: 'smooth',
    });
  }
}
