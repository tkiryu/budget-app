import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '../store';
import { BudgetService } from '../budget.service';
import { Income } from '../income';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddIncomeComponent implements OnInit, OnDestroy {

  incomes$: Observable<Income[]>;

  incomesSubscription: Subscription;

  form = this.fb.group({
    date: [new Date(), Validators.required],
    payee: ['', Validators.required],
    amount: [0, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private store: Store,
    private budgetService: BudgetService
  ) { }

  ngOnInit() {
    this.incomes$ = this.store.select('incomes');
    this.incomesSubscription = this.budgetService.getIncomes$.subscribe();
  }

  ngOnDestroy() {
    this.incomesSubscription.unsubscribe();
  }

  addIncome() {
    // validation
    if (!this.form.valid) {
      for (let key in this.form.controls) {
        this.form.controls[key].markAsTouched();
      }
      return;
    }

    // add income to the list
    this.budgetService.addIncome({
      id: Date.now(),
      ...this.form.value
    });

    // reset form
    this.form.reset({
      date: new Date(),
      payee: '',
      amount: 0
    });
  }
}
