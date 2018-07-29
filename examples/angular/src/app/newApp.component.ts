import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {helpers, State} from 'src/app/newStore';

@Component({
  selector: 'app-root',
  template: `
    <p>Value: {{ value$ | async }}</p>
    <button (click)="increment()">Increment</button>
    <button (click)="setRemoteValue()">Set remote value</button>
  `,
})
export class NewAppComponent {
  value$: Observable<number>;

  constructor(private store: Store<{counter: State}>) {
    this.value$ = store.pipe(select(x => x.counter.value));
  }

  increment() {
    this.store.dispatch(helpers.actionCreators.increment());
  }

  setRemoteValue() {
    this.store.dispatch(helpers.actionCreators.useRemoteValue(1));
  }
}


