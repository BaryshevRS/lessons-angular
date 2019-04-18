import {ChangeDetectorRef, Component} from '@angular/core';
import {Subscribable, Subscription} from "rxjs";
import {ChangeDetection} from "@angular/cli/lib/config/schema";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private cd: ChangeDetectorRef) {}

  componentActive = false;

  logs = [];

  initComponent(value: boolean = false) {
    this.componentActive = value;
  }

  events(subcribe: Subscription) {
      this.logs.push(subcribe.closed);
      this.cd.detectChanges();
      console.log('subcribe', subcribe);

  }
}
