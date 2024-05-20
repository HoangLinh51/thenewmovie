import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {
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
    this.getMovieSimiliar(this.id);
  }
  toggleText(): void {
    this.isFullText = !this.isFullText;
    this.buttonText = this.isFullText ? 'Show Less' : 'Show More';
  }

  getDetail(id: string) {
    this.movieService.getDetail(id, 'movie').subscribe(
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
    this.movieService.getMovieComponent(id, 'movie').subscribe((data) => {
      this.similiar = data.similarMovies;
      this.reviews = data.reviews;
    });
  }
}
