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
    this.scrollLeft();
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
    
  scrollLeft() {
    setInterval(() => {
      this.listContainer.nativeElement.scrollBy({
        left: 1450,
        behavior: 'smooth',
      });
      
      // Kiểm tra và quay lại vị trí đầu nếu đã cuộn hết
      if (this.listContainer.nativeElement.scrollLeft + this.listContainer.nativeElement.clientWidth >= this.listContainer.nativeElement.scrollWidth) {
        this.listContainer.nativeElement.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      }
    }, 5000); // Thời gian 3 giây
  }
}
