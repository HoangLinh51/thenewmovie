import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { PageComponent } from './page/page.component';
import { CollectionsComponent } from './movie/collections/collections.component';
import { SettingsComponent } from './movie/settings/settings.component';
import { HomeComponent } from './movie/home/home.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { TvListComponent } from './movie/tv-list/tv-list.component';
import { SearchComponent } from './movie/search/search.component';

const routes: Routes = [
  {
    path: 'calendar',
    component: PageComponent,
  },
  {
    path: '', 
    component: MovieComponent,
    children: [
      {
        path: 'home',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: 'movie',
        component: MovieListComponent,
      },
      {
        path: 'tv',
        component: TvListComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'collections',
        component: CollectionsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
