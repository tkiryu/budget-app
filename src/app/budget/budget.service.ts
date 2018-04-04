import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Store } from './store';
import { Budget } from './budget';
import { Transaction } from './transaction';
import { Income } from './income';
import { User } from './user';

@Injectable()
export class BudgetService {
  private budgetsUrl = '/api/budgets';
  private transactionsUrl = '/api/transactions';
  private incomesUrl = '/api/incomes';
  private usersUrl = '/api/users';

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  getBudgets$ = this.http
    .get<Budget[]>(this.budgetsUrl)
    .do(budgets => this.store.set('budgets', budgets));

  addBudget(event: Budget) {
    this.http
      .post<Budget>(this.budgetsUrl, event)
      .subscribe(budget => {
        const newBudgets = [ ...this.store.value.budgets, budget ];
        this.store.set('budgets', newBudgets);
      });
  }

  removeBudget(event: Budget) {
    this.http
      .delete<Budget>(`${this.budgetsUrl}/${event.id}`)
      .subscribe(budget => {
        const newBudgets = this.store.value.budgets.filter(budget => budget.id !== event.id);
        this.store.set('budgets', newBudgets);
      });
  }

  getTransactions$ = this.http
    .get<Transaction[]>(this.transactionsUrl)
    .do(transactions => this.store.set('transactions', transactions));

  addTransaction(event: Transaction) {
    this.http
      .post<Transaction>(this.transactionsUrl, event)
      .subscribe(transaction => {
        const newTransactions = [ ...this.store.value.transactions, transaction ];
        this.store.set('transactions', newTransactions);
      });
  }

  updateTransaction(event: Transaction) {
    this.http
      .put<Transaction>(`${this.transactionsUrl}/${event.id}`, event)
      .subscribe(transaction => {
        const newTransactions = this.store.value.transactions.map(tran => {
          if (tran.id === transaction.id) {
            return { ...tran, ...transaction };
          }
          return tran;
        });
        this.store.set('transactions', newTransactions);
      });
  }

  getIncomes$ = this.http
    .get<Income[]>(this.incomesUrl)
    .do(incomes => this.store.set('incomes', incomes));

  addIncome(event: Income) {
    this.http
      .post<Income>(this.incomesUrl, event)
      .subscribe(income => {
        const newIncomes = [ ...this.store.value.incomes, income ];
        this.store.set('incomes', newIncomes);
      });
  }

  getUser$ = this.http
    .get<User>(`${this.usersUrl}/1`)
    .do(user => this.store.set('user', user));

  updateUser(event: User) {
    this.http
      .put<User>(`${this.usersUrl}/${event.id}`, event)
      .subscribe(user => {
        const newUser = { ...this.store.value.user, ...user };
        this.store.set('user', newUser);
      });
  }
}
