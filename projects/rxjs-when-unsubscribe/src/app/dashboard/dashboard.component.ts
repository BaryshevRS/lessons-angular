import {ChangeDetectorRef, Component} from '@angular/core';
import IntervalStatus from "../classes/IntervalStatus";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private cd: ChangeDetectorRef) {
  }

  componentActive = false;

  intervalCommon: IntervalStatus;
  intervalMemoryLeak: IntervalStatus;
  intervalTakeWhileMemoryLeak: IntervalStatus;
  intervalTemplate: IntervalStatus;

  initComponent(value: boolean = false) {
    this.componentActive = value;

    this.intervalCommon = null;
    this.intervalMemoryLeak = null;
    this.intervalTakeWhileMemoryLeak = null;
    this.intervalTemplate = null;
  }

  eventsIntervalCommon(intervalStatus: IntervalStatus) {
    // console.log('intervalStatus', intervalStatus);

    this.intervalCommon = intervalStatus;
    this.cd.detectChanges();
  }

  eventsIntervalMemoryLeak(intervalStatus: IntervalStatus) {
    // console.log('intervalStatus', intervalStatus);

    this.intervalMemoryLeak = intervalStatus;
    this.cd.detectChanges();
  }

  eventsIntervalTakeWhileMemoryLeak(intervalStatus: IntervalStatus) {
    // console.log('intervalStatus', intervalStatus);

    this.intervalTakeWhileMemoryLeak = intervalStatus;
    this.cd.detectChanges();
  }

  eventsIntervalTemplate(intervalStatus: IntervalStatus) {
    // console.log('intervalStatus', intervalStatus);

    this.intervalTemplate = intervalStatus;
    this.cd.detectChanges();
  }
}
