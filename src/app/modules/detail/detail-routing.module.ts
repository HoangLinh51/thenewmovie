import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { TvComponent } from './tv/tv.component';

const routes: Routes = [
  {
    path: 'movie/:id',
    component: MovieComponent,
  }, 
  {
    path: 'tv/:id',
    component: TvComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailRoutingModule {}
