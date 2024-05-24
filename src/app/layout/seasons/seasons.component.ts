import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IMGURL } from 'src/app/constant/localstorage-key';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss'],
})
export class SeasonsComponent {
  @ViewChild('listContainer', { static: true }) listContainer!: ElementRef;
  @Input() seasons: any;
  imgUrl: string = ''
  
  ngOnInit() {
    this.imgUrl = IMGURL
  }

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
