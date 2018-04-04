import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '../store';
import { BudgetService } from '../budget.service';
import { Budget } from '../budget';
import { Recurrence } from '../recurrence.enum';

export interface BudgetMap {
  name: string;
  amount: number,
  percentage: string
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsComponent implements OnInit, OnDestroy {

  budgetsMap$: Observable<BudgetMap[]>;

  budgetsSubscription: Subscription;

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store,
    private budgetService: BudgetService
  ) { }

  ngOnInit() {
    const budgets$ = this.store.select<Budget[]>('budgets');

    this.budgetsMap$ = budgets$
        .filter(Boolean)
        .map(budgets => {
          const totalAmount = budgets.reduce((total, budget) => total + budget.amount, 0);
          return budgets.map(budget => {
            return {
              name: budget.name,
              amount: budget.amount,
              percentage: ((budget.amount / totalAmount) * 100).toFixed(2) + '%'
            };
          });
        });

    this.budgetsSubscription = this.budgetService.getBudgets$.subscribe();
  }

  ngOnDestroy(): void {
    this.budgetsSubscription.unsubscribe();
  }
}
