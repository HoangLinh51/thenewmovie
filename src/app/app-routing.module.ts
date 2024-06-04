import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchComponent } from './layout/watch/watch.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./modules/detail/detail.module').then((m) => m.DetailModule),
  },
  {
    path: '',
    loadChildren: ()=>
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'watch/:category/:id',
    component: WatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
