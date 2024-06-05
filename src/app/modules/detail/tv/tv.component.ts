import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMGURL } from 'src/app/data/constant/localstorage-key';
import { MovieService } from 'src/app/data/service/movie.service';
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
  imgUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,private router: Router
  ) { }
  ngOnInit() {
    this.imgUrl = IMGURL
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getDetail(this.id);
    this.getMovieSimiliar(this.id)
  }

  getDetail(id: string) {
    this.movieService.getDetail(id, 'tv').subscribe(
      (data) => {
        this.detail = data;
        console.log(this.detail)
      }
    );
  }

  getMovieSimiliar(id: string) {
    this.movieService.getMovieComponent(id, 'tv').subscribe((data) => {
      this.similiar = data.similarMovies;
      this.reviews = data.reviews;
    });
  }

  watch(){
    this.router.navigate(['watch', 'tv', this.detail.id])
  }
}
