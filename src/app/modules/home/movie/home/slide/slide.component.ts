import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IMGURL } from 'src/app/data/constant/localstorage-key';
import { MovieService } from 'src/app/data/service/movie.service';

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

  constructor(private movieService: MovieService,private router: Router) { }

  ngOnInit() {
    this.imgUrl = IMGURL
    this.scrollSlide();
    this.fetchTrendingList((results) => {
      this.trendingList = results
    }
    )
  }

  fetchTrendingList(callback: (results: any) => void) {
    this.movieService
      .getTrending('week')
      .subscribe((list) => {
        callback(list.results);
      });
  }
  routerNavigate(type: string, id : string) {
    this.router.navigate(['/detail/', type, id,])
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

  watch(type: string, id : string){
    this.router.navigate(['watch', type, id])
  }

}
