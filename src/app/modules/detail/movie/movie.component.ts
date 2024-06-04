import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMGURL } from 'src/app/data/constant/localstorage-key';
import { MovieService } from 'src/app/data/service/movie.service';

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

  imgUrl: string = ''

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.imgUrl = IMGURL
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
        console.log(this.detail)
      }
    );
  }

  getMovieSimiliar(id: string) {
    this.movieService.getMovieComponent(id, 'movie').subscribe((data) => {
      this.similiar = data.similarMovies;
      this.reviews = data.reviews;
    });
  }
  watch(){
    this.router.navigate(['watch', 'movie', this.detail.id])
  }
}
