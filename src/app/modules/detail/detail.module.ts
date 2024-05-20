import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailRoutingModule } from './detail-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { ReviewsComponent } from '../../layout/reviews/reviews.component';
import { SimiliarComponent } from '../../layout/similiar/similiar.component';
import { MovieComponent } from './movie/movie.component';
import { TvComponent } from './tv/tv.component';
import { SeasonsComponent } from '../../layout/seasons/seasons.component';

@NgModule({
  declarations: [
    MovieComponent,
    ReviewsComponent,
    SimiliarComponent,
    TvComponent,
    SeasonsComponent,
  ],
  imports: [CommonModule, DetailRoutingModule, ShareModule],
})
export class DetailModule {}
