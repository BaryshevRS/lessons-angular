import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {fromEvent, interval, Observable, Subject, Subscription} from "rxjs";
import {take, takeUntil, takeWhile} from "rxjs/operators";

@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.component.html'
  // template: `<div *ngFor="let time of intervalTemplate | async">Подписка в шаблоне {{time}}</div>`
})
export class InfiniteComponent implements OnInit, OnDestroy {

  constructor(private element: ElementRef) {}

  @Output() events: EventEmitter<Subscription> = new EventEmitter();
  private unsubscribe$: Subject<void> = new Subject<void>();

  intervalCommon: Subscription;
  intervalMemoryLeak: Subscription;
  intervalTakeWhileMemoryLeak: Subscription;
  intervalTemplate: Observable<number>;

  active = true;

  ngOnInit() {

    console.log('InfiniteComponent ngOnInit');

    this.intervalCommon = interval(1000)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        console.log('intervalCommon');
      });

    this.intervalTakeWhileMemoryLeak = interval(1000)
      .pipe(
        takeWhile(() => this.active)
      )
      .subscribe(() => {
        console.log('intervalTakeWhileMemoryLeak');
      });

    this.intervalMemoryLeak = interval(1000)
      .subscribe(() => {
        console.log('intervalMemoryLeak');
      });

    this.intervalTemplate = interval(1000);
  }

  ngOnDestroy(): void {
    this.active = false;

    console.log('this.intervalTakeWhileMemoryLeak', this.intervalTakeWhileMemoryLeak);

    if(!this.intervalTemplate.hasOwnProperty('unsubscribe')) {
      console.log('ddthis.intervalTemplate');
    }

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
