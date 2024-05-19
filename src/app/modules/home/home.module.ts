import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShareModule } from 'src/app/share/share.module';
import { HomeRoutingModule } from './home-routing.module';
import { MovieComponent } from './movie/movie.component';
import { PageComponent } from './page/page.component';

import { CalendarModule } from 'primeng/calendar';
import { ListComponent } from './movie/list/list.component';

@NgModule({
  declarations: [PageComponent, MovieComponent, ListComponent],
  imports: [CommonModule, HomeRoutingModule, ShareModule, CalendarModule],
})
export class HomeModule { }
