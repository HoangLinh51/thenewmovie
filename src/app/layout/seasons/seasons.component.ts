import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IMGURL } from 'src/app/data/constant/localstorage-key';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss'],
})
export class SeasonsComponent {
  @ViewChild('listContainer', { static: true }) listContainer!: ElementRef;
  @Input() seasons: any;
  imgUrl: string = ''

  constructor(private router: Router) { }

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

  reloadPage(id: string) {
    this.router.navigate(['/detail/tv', id]).then(() => window.location.reload())
  }
}
