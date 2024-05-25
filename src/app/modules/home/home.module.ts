import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShareModule } from 'src/app/share/share.module';
import { HomeRoutingModule } from './home-routing.module';
import { MovieComponent } from './movie/movie.component';
import { PageComponent } from './page/page.component';

import { CalendarModule } from 'primeng/calendar';
import { TvListComponent } from './movie/tv-list/tv-list.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { SearchComponent } from './movie/search/search.component';
import { HomeComponent } from './movie/home/home.component';
import { CollectionsComponent } from './movie/collections/collections.component';
import { SettingsComponent } from './movie/settings/settings.component';
import { ComponentComponent } from './movie/home/component/component.component';
import { SlideComponent } from './movie/home/slide/slide.component';
import { LayoutModule } from 'src/app/layout/layout.module';
@NgModule({
  declarations: [
    PageComponent,
    MovieComponent,
    TvListComponent,
    MovieListComponent,
    SearchComponent,
    HomeComponent,
    CollectionsComponent,
    SettingsComponent,
    ComponentComponent, SlideComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, ShareModule, CalendarModule,LayoutModule],
})
export class HomeModule { }
