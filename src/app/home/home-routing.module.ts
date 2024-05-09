import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageComponent } from './page/page.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
  },
  {
    path: 'movie',
    component: MovieComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
