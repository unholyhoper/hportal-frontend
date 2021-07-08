import {Component, OnInit} from '@angular/core';
import {
  EventSettingsModel,
  AgendaService,
  DayService,
  MonthService,
  TimelineMonthService,
  WeekService
} from '@syncfusion/ej2-angular-schedule';

@Component({
  styleUrls: ['./scheduler.component.scss'],
  selector: 'app-scheduler',
  providers: [DayService, WeekService, MonthService, AgendaService, TimelineMonthService],
// specifies the template string for the Schedule component
  template: `
    <ejs-schedule width='100%' height='550px' [selectedDate]="selectedDate"
                  [eventSettings]="eventSettings"></ejs-schedule>`
})
export class SchedulerComponent {
  public data: object[] = [{
    Id: 2,
    Subject: 'Paris',
    StartTime: new Date(2018, 1, 15, 10, 0),
    EndTime: new Date(2018, 1, 15, 12, 30)
  }];
  public selectedDate: Date = new Date(2018, 1, 15);
  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  };
}
