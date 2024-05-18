import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  id: string = '';
  detail: any;
  url = 'https://image.tmdb.org/t/p/original';
  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || ''
    this.getMovieById()
  }

  getMovieById() {
    this.movieService.getMovieById(this.id).subscribe(
      (data) => {
        this.detail = data;
        console.log('Account info:', this.detail);
      },
      (error) => {
        console.error('Error:', error);
      }
    );

  }
}
