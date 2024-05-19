import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailRoutingModule } from './detail-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { PageComponent } from './page/page.component';
import { OverviewComponent } from './page/overview/overview.component';
import { ReviewsComponent } from './page/reviews/reviews.component';
import { SimiliarComponent } from './page/similiar/similiar.component';

@NgModule({
  declarations: [PageComponent, OverviewComponent, ReviewsComponent, SimiliarComponent],
  imports: [CommonModule, DetailRoutingModule, ShareModule],
})
export class DetailModule {}
