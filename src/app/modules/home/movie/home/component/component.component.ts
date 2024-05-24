import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IMGURL } from 'src/app/constant/localstorage-key';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent {
  @ViewChild('listContainer', { static: true }) listContainer!: ElementRef;
  @Input() listMovie:any
  @Input() list!: string
    
  imgUrl : string = '';
  ngOnInit(){
    this.imgUrl = IMGURL
  }
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
