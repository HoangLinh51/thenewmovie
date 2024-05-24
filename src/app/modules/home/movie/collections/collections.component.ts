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
  currentPage: number = 0; 
  imgUrl: string = ''
  constructor(private movieService: MovieService) { }
  ngOnInit() {
    this.imgUrl = IMGURL
    // this.getCollection()
  }

  onPageChange(event: PaginatorState) {
    if (event.page !== undefined) {
      console.log('this.currentPage', this.currentPage)
      this.currentPage = event.page + 1;
      console.log('currentPage', this.currentPage)
      // this.getCollection(this.category, this.list, this.currentPage);
    }
  }

  getCollection() {
    this.movieService.getCollection().subscribe((data) => {
      this.dataJson = data;
      console.log('data', this.dataJson)
    });
  }
}
