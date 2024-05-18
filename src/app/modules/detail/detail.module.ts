import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { ShareModule } from 'src/app/share/share.module';
import { DetailRoutingModule } from './detail-routing.module';



@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,DetailRoutingModule,ShareModule
  ]
})
export class DetailModule { }
