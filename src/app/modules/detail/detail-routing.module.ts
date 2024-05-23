import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { TvComponent } from './tv/tv.component';
import { PersonComponent } from './person/person.component';

const routes: Routes = [
  {
    path: 'movie/:id',
    component: MovieComponent,
  }, 
  {
    path: 'tv/:id',
    component: TvComponent,
  },
  {
    path: 'person/:id',
    component: PersonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailRoutingModule {}
