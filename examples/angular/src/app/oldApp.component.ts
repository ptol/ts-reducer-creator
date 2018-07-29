import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Increment, State, UseRemoteValue} from 'src/app/oldStore';

@Component({
  selector: 'app-root',
  template: `
    <p>Value: {{ value$ | async }}</p>
    <button (click)="increment()">Increment</button>
    <button (click)="useRemoteValue()">Use remote value</button>
  `,
})
export class OldAppComponent {
  value$: Observable<any>;

  constructor(private store: Store<{counter: State}>) {
    this.value$ = store.pipe(select(x => x.counter.value));
  }

  increment() {
    this.store.dispatch(new Increment());
  }

  useRemoteValue() {
    this.store.dispatch(new UseRemoteValue(1));
  }
}


