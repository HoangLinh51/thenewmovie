import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { IMGURL } from 'src/app/data/constant/localstorage-key';
import { MovieService } from 'src/app/data/service/movie.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  formSearch!: FormGroup;
  listSearch: any;
  totalpage!: number
  paginatedData: any
  trendingSearch: any

  first: number = 0;
  pageSize: number = 20;
  imgUrl: string = '';

  constructor(private form: FormBuilder, private movieService: MovieService, private router: Router) { }

  ngOnInit() {
    this.formSearch = this.form.group({
      query: ['', Validators.required],
    });
    this.imgUrl = IMGURL
    this.getTrendingSearch()
  }

  onSearch(): void {
    if (this.formSearch.valid) {
      if (this.formSearch.value.query !== '') {
        const query = this.formSearch.value.query;
        this.movieService
          .search(query, 1)
          .subscribe(
            (data) => {
              this.listSearch = data.results;
              this.totalpage = data.total_pages;
            },
            (error) => {
              console.error('Error fetching search results:', error);
            }
          );
      }
    }
  }

  onPageChange(event: PaginatorState) {
    if (event.page !== undefined) {
      const page = event.page + 1
      this.movieService
        .search(this.formSearch.value.query, page)
        .subscribe((data) => {
          this.listSearch = data.results;
        });
    }
  }

  getTrendingSearch() {
    this.movieService.getTrending('day').subscribe(
      (data) => {
        this.trendingSearch = data.results;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
