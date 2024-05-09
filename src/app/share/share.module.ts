import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    TabViewModule,
    DialogModule,
    PaginatorModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    NgbModalModule,
    FlatpickrModule,
    TabViewModule,
    DialogModule,
    PaginatorModule,
  ],
})
export class ShareModule {}
