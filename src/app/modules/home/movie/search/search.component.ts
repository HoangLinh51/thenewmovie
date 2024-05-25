import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaginatorState } from 'primeng/paginator';
import { IMGURL } from 'src/app/constant/localstorage-key';
import { MovieService } from 'src/app/service/movie.service';
interface Category {
  name: string;
  code: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  category: Category[] | undefined;
  formSearch!: FormGroup;
  listSearch: any;
  totalpage: number = 0;

  imgUrl: string = '';

  constructor(private form: FormBuilder, private movieService: MovieService) { }

  ngOnInit() {
    this.category = [
      { name: 'All', code: 'multi' },
      { name: 'Movie', code: 'movie' },
      { name: 'Tv', code: 'tv' },
      { name: 'Person', code: 'person' },
      { name: 'Collection', code: 'collection' },
      { name: 'Company', code: 'company' },
    ];
    this.formSearch = this.form.group({
      query: ['', Validators.required],
      category: ['', Validators.required],
    });
    this.imgUrl = IMGURL
  }

  onPageChange(event: PaginatorState) {
    if (event.page !== undefined) {
      this.totalpage = event.page + 1;
      this.movieService.search(
        this.formSearch.value.category.code,
        this.formSearch.value.query,
        this.totalpage
      );
    }
  }

  onSearch(): void {
    if (this.formSearch.valid) {
      this.movieService
        .search(
          this.formSearch.value.category.code,
          this.formSearch.value.query,
          1
        )
        .subscribe((data) => {
          this.listSearch = data.results;
          this.totalpage = data.total_pages;
        });
    }
  }
}
