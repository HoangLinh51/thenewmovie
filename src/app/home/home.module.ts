import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PageComponent } from './page/page.component';
import { ShareModule } from '../share/share.module';
import { CalendarModule } from 'primeng/calendar';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  declarations: [PageComponent, MovieComponent],
  imports: [CommonModule, HomeRoutingModule, ShareModule, CalendarModule],
})
export class HomeModule {}
