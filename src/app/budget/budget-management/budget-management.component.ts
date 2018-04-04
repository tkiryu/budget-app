import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/observable/zip';
import { Subscription } from 'rxjs/Subscription';

import { IgxDialogComponent } from 'igniteui-angular/main';

import { Store } from '../store';
import { BudgetService } from '../budget.service';
import { Budget } from '../budget';
import { Recurrence } from '../recurrence.enum';
import { Transaction } from '../transaction';
import { transition } from '@angular/animations';

@Component({
  selector: 'app-budget-management',
  templateUrl: './budget-management.component.html',
  styleUrls: ['./budget-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetManagementComponent implements OnInit, OnDestroy {

  budgets$: Observable<Budget[]>;
  transactions$: Observable<Transaction[]>;

  // subscriptions
  transactionsSubscription: Subscription;
  budgetsSubscription: Subscription;

  budgetsMap: Budget[];

  @ViewChild('dialog') dialog: IgxDialogComponent;

  form = this.fb.group({
    name: ['', Validators.required],
    recurrence: ['', Validators.required],
    amount: [0, Validators.required],
  });

  get recurrences() {
    return Object.values(Recurrence);
  };

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private store: Store,
    private budgetService: BudgetService
  ) { }

  ngOnInit() {
    zip(
      this.store.select<Budget[]>('budgets'),
      this.store.select<Transaction[]>('transactions'),
    )
    .subscribe(([budgets, transactions]) => {
      if (budgets && transactions) {
        const budgetsMap = budgets.map(budget => {
          const total = transactions
                          .filter(transaction => transaction.id === budget.id)
                          .reduce((total, transaction) => total + transaction.amount, 0);
          return {
            ...budget,
            allocated: total,
            remaining: budget.yearlyAmount - total
          };
        });
        this.budgetsMap = budgetsMap;
        this.cdr.markForCheck();
      }
    });

    this.budgetsSubscription = this.budgetService.getBudgets$.subscribe();
    this.transactionsSubscription = this.budgetService.getTransactions$.subscribe();
  }

  ngOnDestroy() {
    this.budgetsSubscription.unsubscribe();
  }

  createBudget() {
    // validation
    if (!this.form.valid) {
      for (let key in this.form.controls) {
        this.form.controls[key].markAsTouched();
      }
      return;
    }

    // add budget to the list
    this.budgetService.addBudget({
      id: Date.now(),
      ...this.form.value
    });

    this.closeDialog();
  }

  closeDialog() {
    this.dialog.close();
    // reset form
    this.form.reset({
      name: '',
      recurrence: '',
      amount: 0
    });
  }

  removeBudget(event: Budget) {
    this.budgetService.removeBudget(event);
  }
}
