import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss'],
})
export class SeasonsComponent {
  @ViewChild('listContainer', { static: true }) listContainer!: ElementRef;
  @Input() seasons: any;
  @Input()imgUrl!: string

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
