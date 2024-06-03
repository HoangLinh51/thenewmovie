import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { startOfDay, endOfDay, isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarView,
} from 'angular-calendar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OCCASION_KEY } from 'src/app/data/constant/localstorage-key';
import { StorageService } from 'src/app/data/service/localstorage.service';

interface CustomCalendarEvent extends CalendarEvent<any> {
  host: string;
  member: string;
  location: string;
  content: string;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  idGenarate = 1;
  startDate = startOfDay(new Date());
  endDate = endOfDay(new Date());
  visible: boolean = false;
  events: CalendarEvent[] = [];
  dialogEdit: boolean = false;
  edit: any;
  occasionForm!: FormGroup;
  occasionEdit!: FormGroup;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  activeDayIsOpen!: boolean;
  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      },
    },
  ];

  constructor(
    private modal: NgbModal,
    private form: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.initFormGroups();
    this.loadDataFromLocalstorage();
  }

  initFormGroups() {
    this.occasionForm = this.form.group(this.getFormControlsConfig());
    this.occasionEdit = this.form.group(this.getFormControlsConfig());
  }

  getFormControlsConfig() {
    return {
      title: ['', Validators.required],
      start: [new Date()],
      end: [new Date()],
      host: ['', Validators.required],
      member: ['', Validators.required],
      location: ['', Validators.required],
      content: ['', Validators.required],
    };
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (!isSameMonth(date, this.viewDate) || events.length === 0) {
      this.activeDayIsOpen = false;
      this.visible = !this.activeDayIsOpen;
    } else {
      this.activeDayIsOpen = !this.activeDayIsOpen;
    }
    this.edit = events;
    this.viewDate = date;
  }

  handleEvent(action: string, event: CalendarEvent) {
    if (action === 'Edited') {
      this.dialogEdit = true;
    } else if (action === 'Clicked') {
      this.modalData = { action, event };
      this.modal.open(this.modalContent, { size: 'lg' });
    }
  }

  addEvent(): void {
    this.visible = true;
    const occasionLocalStorage =
      this.storageService.get(OCCASION_KEY) || [];
    const occasion = this.occasionForm.value;
    const startDate = occasion.start;
    const endDate = occasion.end;
    if (
      !isSameDay(startDate, this.startDate) ||
      !isSameDay(endDate, this.endDate)
    ) {
      occasion.start = new Date(startDate);
      occasion.end = new Date(endDate);
    } else if (!isSameDay(startDate, this.startDate)) {
      occasion.start = new Date(startDate);
    } else if (!isSameDay(endDate, this.endDate)) {
      occasion.end = new Date(endDate);
    }
    occasion.id = occasionLocalStorage.length + 1;
    occasionLocalStorage.push(occasion);
    this.storageService.set(OCCASION_KEY, occasionLocalStorage);
    this.visible = false;
    this.loadDataFromLocalstorage();
  }

  editEvent(event: CustomCalendarEvent[]) {
    this.dialogEdit = true;
    const eventEditIndex = this.events.findIndex(
      (events: any) => events.id === event[0].id
    );
    if (eventEditIndex !== -1) {
      const existingEvent = event[0];
      const newEventData = this.occasionEdit.value;
      const updateEvent = {
        ...existingEvent,
        title: newEventData.title || existingEvent.title,
        start: newEventData.start || existingEvent.start,
        end: newEventData.end || existingEvent.end,
        host: newEventData.host || existingEvent.host,
        member: newEventData.member || existingEvent.member,
        location: newEventData.location || existingEvent.location,
        content: newEventData.content || existingEvent.content,
      };
      this.events[eventEditIndex] = updateEvent;
      this.storageService.set(OCCASION_KEY, this.events);
      this.loadDataFromLocalstorage();
      this.dialogEdit = false;
    }
  }

  loadDataFromLocalstorage() {
    const storedEvents = this.storageService.get(OCCASION_KEY);
    if (storedEvents) {
      this.events = storedEvents.map((event: any) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
        actions: this.actions,
      }));
    }
  }

  deleteEvent(event: CalendarEvent) {
    this.events = this.events.filter((events) => events !== event);
    this.storageService.set(OCCASION_KEY, this.events);
    this.activeDayIsOpen = false;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
