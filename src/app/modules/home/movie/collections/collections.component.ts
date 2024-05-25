import { Component } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { IMGURL } from 'src/app/constant/localstorage-key';
import { MovieService } from 'src/app/service/movie.service';

class DataJson {
  id!: number;
  name!: string;
  poster_path!: string
}
@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent {
  dataJson: DataJson[] = []
  imgUrl: string = ''

  paginatedData: any[] = [];
  first: number = 0;
  pageSize: number = 20;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.imgUrl = IMGURL
    this.getCollection()
  }

  getCollection() {
    this.movieService.getCollection().subscribe((data) => {
      this.dataJson = data;
    });
  }

  onPageChange(event: PaginatorState) {
    if (event.first !== undefined) {
      this.first = event.first;
    }
    if (event.rows !== undefined) {
      this.pageSize = event.rows;
    }
    this.paginateData();
  }

  paginateData() {
    this.paginatedData = this.dataJson.slice(this.first, this.first + this.pageSize);
  }
}
