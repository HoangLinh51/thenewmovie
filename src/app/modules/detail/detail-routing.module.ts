import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { TvComponent } from './tv/tv.component';
import { PersonComponent } from './person/person.component';
import { CollectionComponent } from './collection/collection.component';

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
  {
    path: 'collection/:id',
    component: CollectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailRoutingModule {}
