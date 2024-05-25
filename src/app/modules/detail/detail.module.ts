import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailRoutingModule } from './detail-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { ReviewsComponent } from '../../layout/reviews/reviews.component';
import { SimiliarComponent } from '../../layout/similiar/similiar.component';
import { MovieComponent } from './movie/movie.component';
import { TvComponent } from './tv/tv.component';
import { SeasonsComponent } from '../../layout/seasons/seasons.component';
import { PersonComponent } from './person/person.component';
import { ItemComponent } from 'src/app/layout/item/item.component';
import { CollectionComponent } from './collection/collection.component';
import { LayoutModule } from 'src/app/layout/layout.module';

@NgModule({
  declarations: [
    MovieComponent,
    TvComponent,
    PersonComponent,CollectionComponent
  ],
  imports: [CommonModule, DetailRoutingModule, ShareModule, LayoutModule],
})
export class DetailModule {}
