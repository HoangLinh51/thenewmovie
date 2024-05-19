import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  detail: any;
  similarMovies: any;
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
    this.movieService.getDetail(id).subscribe(
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
    this.movieService.getMovieComponent(id).subscribe((data) => {
      this.similarMovies = data.similarMovies;
      this.reviews = data.reviews;
      console.log('Similar Movies:', this.similarMovies);
      console.log('Reviews:', this.reviews);
    });
  }
}
