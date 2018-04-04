import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { IgxDialogComponent } from 'igniteui-angular/main';

import { Store } from '../store';
import { BudgetService } from '../budget.service';
import { Budget } from '../budget';
import { Recurrence } from '../recurrence.enum';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  // budget observalbes
  budgets$: Observable<Budget[]>;

  totalBudget$: Observable<number>;
  unallocatedBudget$: Observable<number>;

  budgetsByMonthly$: Observable<Budget[]>;
  subtotalByMonthly$: Observable<number>;

  budgetsByEverySixMonths$: Observable<Budget[]>;
  subtotalEverySixMonths$: Observable<number>;

  // transaction observables
  transactions: Transaction[] = [];
  transactions$: Observable<Transaction[]>;

  // subscriptions
  budgetsSubscription: Subscription;
  transactionsSubscription: Subscription;

  isCreating = false;

  form = this.fb.group({
    date: [new Date(), Validators.required],
    payee: ['', Validators.required],
    amount: [0, Validators.required],
    fromBudget: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private store: Store,
    private budgetService: BudgetService
  ) { }

  ngOnInit() {
    this.budgets$ = this.store.select('budgets');

    this.totalBudget$ = this.budgets$
      .filter(Boolean)
      .map(budgets => budgets.reduce((total, budget) => total + budget.amount, 0));

    this.unallocatedBudget$ = this.budgets$
      .filter(Boolean)
      .map(budgets => budgets.reduce((unallocated, budget) => unallocated + budget.remaining, 0));

    this.budgetsByMonthly$ = this.budgets$
      .filter(Boolean)
      .map(budgets => budgets.filter(budget =>  budget.recurrence === Recurrence.Monthly));

    this.subtotalByMonthly$ = this.budgetsByMonthly$
      .map(budgets => budgets.reduce((subtotal, budget) => subtotal + budget.amount, 0));

    this.budgetsByEverySixMonths$ = this.budgets$
      .filter(Boolean)
      .map(budgets => budgets.filter(budget =>  budget.recurrence === Recurrence.EverySixMonths));

    this.subtotalEverySixMonths$ = this.budgetsByEverySixMonths$
      .map(budgets => budgets.reduce((subtotal, budget) => subtotal + budget.amount, 0));

    this.transactions$ = this.store.select('transactions');

    this.budgetsSubscription = this.budgetService.getBudgets$.subscribe();
    this.transactionsSubscription = this.budgetService.getTransactions$.subscribe();
  }

  ngOnDestroy() {
    this.budgetsSubscription.unsubscribe();
    this.transactionsSubscription.unsubscribe();
  }

  verifyTransaction(event: Transaction) {
    this.budgetService.updateTransaction({ ...event, verified: true });
  }

  createTransaction() {
    // validation
    if (!this.form.valid) {
      for (let key in this.form.controls) {
        this.form.controls[key].markAsTouched();
      }
      return;
    }

    // add transaction to the list
    this.budgetService.addTransaction({
      id: Date.now(),
      ...this.form.value,
      type: '',
      verified: false
    });

    this.isCreating = false;

    this.form.reset({
      date: new Date(),
      payee: '',
      amount: 0,
      fromBudget: ''
    });
  }
}
