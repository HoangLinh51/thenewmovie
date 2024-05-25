import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMGURL } from 'src/app/constant/localstorage-key';
import { MovieService } from 'src/app/service/movie.service';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  detail: any;
  reviews: any;
  id: string = '';
  similiar: any;
  isFullText: boolean = false;
  buttonText: string = 'Show More';
  imgUrl: string = ''

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.imgUrl = IMGURL
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getDetail(this.id);
  }

  getDetail(id: string) {
    this.movieService.getDetail(id, 'person').subscribe(
      (data) => {
        this.detail = data;
      }
    );
  }
}
