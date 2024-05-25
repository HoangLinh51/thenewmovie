import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IMGURL } from 'src/app/constant/localstorage-key';

@Component({
  selector: 'app-similiar',
  templateUrl: './similiar.component.html',
  styleUrls: ['./similiar.component.scss'],
})
export class SimiliarComponent {
  @ViewChild('listContainer', { static: true }) listContainer!: ElementRef;
  @Input() similarMovies: any;
  @Input() category: any
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
