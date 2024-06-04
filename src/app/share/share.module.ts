import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ToastrModule } from 'ngx-toastr';
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
    DropdownModule,    
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 1500,
      progressBar: true,
    }),
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
    DropdownModule,
    ToastrModule,
  ],
})
export class ShareModule { }
