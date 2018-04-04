import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/pluck';

import { State } from './state';

const state: State = {
  budgets: undefined,
  transactions: undefined,
  incomes: undefined,
  user: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);

  private store = this.subject.asObservable().distinctUntilChanged();

  get value() {
    return this.subject.value;
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

  select<T>(name: string): Observable<T> {
    return this.store.pluck(name);
  }
}
