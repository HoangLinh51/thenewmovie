import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.scss']
})
export class TvListComponent {
  dataResults: any
  totalPages: number = 0;
  currentPage: number = 0;
  category= 'tv'
  list: string=''
  imgUrl = 'https://image.tmdb.org/t/p/original';
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getListMovie('tv', 'airing_today', 1)
  }

  getListMovie(category: string, list: string, page: number) {
    this.movieService.getList(category,list, page).subscribe(
      (data) => {      
        console.log('data.results', data)
        this.dataResults = data.results;
        this.list = list
        this.totalPages = data.total_pages
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  
  onPageChange(event: PaginatorState) {
    if (event.page !== undefined) {
      console.log('this.currentPage', this.currentPage)
      this.currentPage = event.page + 1;
      console.log('currentPage',this.currentPage )    
      this.getListMovie(this.category, this.list, this.currentPage);
    }
  }
}
