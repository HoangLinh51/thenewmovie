import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IMGURL } from 'src/app/constant/localstorage-key';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent {
  @ViewChild('listContainer', { static: true }) listContainer!: ElementRef;
  trendingList: any
  currentSlide: number = 0;
  slideInterval: any;
  imgUrl: string = '';

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.imgUrl = IMGURL
    this.scrollSlide();
    this.fetchTrendingList((results) => {
      console.log(results)
      this.trendingList = results
    }
    )
  }

  fetchTrendingList(callback: (results: any) => void) {
    this.movieService
      .getTrending()
      .subscribe((list) => {
        callback(list.results);
      });
  }

  scrollSlide() {
    setInterval(() => {
      const listContainer = this.listContainer.nativeElement;
      const scrollDistance = listContainer.clientWidth + 20
  
      listContainer.scrollBy({
        left: scrollDistance,
        behavior: 'smooth',
      });
  
      if (listContainer.scrollLeft + scrollDistance >= listContainer.scrollWidth) {
        setTimeout(() => {
          listContainer.scrollTo({
            left: 0,
            behavior: 'smooth',
          });
        }, 500)
      }
    }, 5000);
  }
  
  
}
