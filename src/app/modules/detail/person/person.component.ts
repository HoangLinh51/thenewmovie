import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  imgUrl = 'https://image.tmdb.org/t/p/original';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getDetail(this.id);
    // this.getMovieSimiliar(this.id);
  }
  getDetail(id: string) {
    this.movieService.getDetail(id, 'person').subscribe(
      (data) => {
        this.detail = data;
        console.log('data', data);
      },
      (err) => {
        console.log('err', err);
      }
    );
  }
}
