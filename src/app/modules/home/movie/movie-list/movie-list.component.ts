import { Component } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { IMGURL } from 'src/app/data/constant/localstorage-key';
import { MovieService } from 'src/app/data/service/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  dataResults: any
  totalPages: number = 0;
  currentPage: number = 0;
  category = 'movie'
  list: string = ''
  imgUrl: string = '';
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.imgUrl = IMGURL
    this.getListMovie('movie', 'now_playing', 1)
  }

  getListMovie(category: string, list: string, page: number) {
    this.movieService.getList(category, list, page).subscribe(
      (data) => {
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
      this.currentPage = event.page + 1;
      this.getListMovie(this.category, this.list, this.currentPage);
    }
  }
}
