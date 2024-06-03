import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMGURL } from 'src/app/data/constant/localstorage-key';
import { MovieService } from 'src/app/data/service/movie.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  @ViewChild('listContainer', { static: true }) listContainer!: ElementRef;
  detail: any
  imgUrl: string = ''
  id: string = ''

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.imgUrl = IMGURL,
      this.getDetail(this.id);
  }

  getDetail(id: string) {
    this.movieService.getDetail(id, 'collection').subscribe(
      (data) => {
        this.detail = data;;
      }
    );
  }

  scrollLeft() {
    this.listContainer.nativeElement.scrollBy({
      left: -790,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.listContainer.nativeElement.scrollBy({
      left: 790,
      behavior: 'smooth',
    });
  }
}
