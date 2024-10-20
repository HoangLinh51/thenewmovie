import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { CollectionsComponent } from './movie/collections/collections.component';
import { SettingsComponent } from './movie/settings/settings.component';
import { HomeComponent } from './movie/home/home.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { TvListComponent } from './movie/tv-list/tv-list.component';
import { SearchComponent } from './movie/search/search.component';
import { SignInComponent } from '../auth/sign-in/sign-in.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { PageSettingComponent } from './movie/settings/page-setting/page-setting.component';

const routes: Routes = [
  {
    path: '',
    component: MovieComponent,
    children: [
      {
        path: '',
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
        children: [
          {
            path: '',
            component: PageSettingComponent,
          },
          {
            path: 'sign-in',
            component: SignInComponent,
          },
          {
            path: 'sign-up',
            component: SignUpComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
