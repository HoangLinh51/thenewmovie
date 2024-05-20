import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss'],
})
export class TvComponent {
  id: string = '';
  detail: any;
  reviews: any;
  similiar: any;
  imgUrl = 'https://image.tmdb.org/t/p/original';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getDetail(this.id);
    this.getMovieSimiliar(this.id)
  }

  getDetail(id: string) {
    this.movieService.getDetail(id, 'tv').subscribe(
      (data) => {
        this.detail = data;
        console.log('data', data);
      },
      (err) => {
        console.log('err', err);
      }
    );
  }
  

  getMovieSimiliar(id: string) {
    this.movieService.getMovieComponent(id, 'tv').subscribe((data) => {
      this.similiar = data.similarMovies;
      this.reviews = data.reviews;
      console.log('this.similiar', this.similiar, )
      console.log('this.reviews', this.reviews, )

    });
  }
}
