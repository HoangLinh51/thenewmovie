import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SeasonsComponent } from './seasons/seasons.component';
import { SimiliarComponent } from './similiar/similiar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SimiliarComponent, SeasonsComponent, ReviewsComponent, ItemComponent],
  imports: [CommonModule, RouterModule],
  exports: [SimiliarComponent, SeasonsComponent, ReviewsComponent, ItemComponent]
})
export class LayoutModule { }
