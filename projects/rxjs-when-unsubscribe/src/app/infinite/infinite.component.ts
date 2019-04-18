import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {interval, Observable, Subject, Subscription} from "rxjs";
import {take, takeUntil, takeWhile} from "rxjs/operators";
import IntervalStatus from "../classes/IntervalStatus";

@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.component.html'
})
export class InfiniteComponent implements OnInit, OnDestroy {

  constructor() {}

  @Output() eventsIntervalCommon: EventEmitter<IntervalStatus> = new EventEmitter();
  @Output() eventsIntervalMemoryLeak: EventEmitter<IntervalStatus> = new EventEmitter();
  @Output() eventsIntervalTakeWhileMemoryLeak: EventEmitter<IntervalStatus> = new EventEmitter();
  @Output() eventsIntervalTemplate: EventEmitter<IntervalStatus> = new EventEmitter();

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
      .subscribe((time) => {
        console.log('intervalCommon');
        this.eventsIntervalCommon.emit(new IntervalStatus(true, time));
      });

    this.intervalTakeWhileMemoryLeak = interval(1000)
      .pipe(
        takeWhile(() => this.active)
      )
      .subscribe((time) => {
        console.log('intervalTakeWhileMemoryLeak');
        this.eventsIntervalTakeWhileMemoryLeak.emit(new IntervalStatus(true, time));
      });

    this.intervalMemoryLeak = interval(1000)
      .subscribe((time) => {
        console.log('intervalMemoryLeak');
        this.eventsIntervalMemoryLeak.emit(new IntervalStatus(true, time));
      });

    this.intervalTemplate = interval(1000);

    // if(this.intervalTemplate) {
    //   this.eventsIntervalTemplate.emit(new IntervalStatus(true, 0));
    // }

  }

  ngOnDestroy(): void {
    this.active = false;

    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    // продолжить следить за потоком
    if(!this.intervalMemoryLeak.closed) {
      this.eventsIntervalMemoryLeak.emit(new IntervalStatus(true, 0));
    }

    // прекратит отслеживать поток, но сохранится в памяти
    if(!this.intervalTakeWhileMemoryLeak.closed) {
      this.eventsIntervalTakeWhileMemoryLeak.emit(new IntervalStatus(true, 0));
    }

    // отпишется из шаблона сразу
    if(!this.intervalTemplate.hasOwnProperty('unsubscribe')) {
      this.eventsIntervalTemplate.emit(new IntervalStatus(false, 0));
    }

    // отписывается
    if(this.intervalCommon.closed) {
      this.eventsIntervalCommon.emit(new IntervalStatus(false, 0));
    }
  }
}
