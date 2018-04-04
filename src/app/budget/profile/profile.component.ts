import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '../store';
import { BudgetService } from '../budget.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  user: User;
  user$: Observable<User>;

  userSubscription: Subscription;

  form = this.fb.group({
    // Account settings
    userName: ['', Validators.required],
    displayName: ['', Validators.required],
    email: ['', Validators.required],

    // Change Password
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    repeatNewPassword: ['', Validators.required],

    // Notifications
    notifyIncome: [false, Validators.required],
    notifyBudgetAllocation: [false, Validators.required],
    notifyExpense: [false, Validators.required],
    notifyTransfer: [false, Validators.required],

    // TODO
    // Time Zone
    timezone: [''],
  });

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private store: Store,
    private budgetService: BudgetService
  ) { }

  ngOnInit() {
    this.user$ = this.store.select('user');
    this.user$
      .filter(Boolean)
      .subscribe(user => {
        this.user = user;
        this.form.reset(user);
        this.cdr.markForCheck();
      });
    this.userSubscription = this.budgetService.getUser$.subscribe()
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  cancelProfile() {
    this.form.reset(this.user);
  }

  saveProfile() {
    // validation
    if (!this.form.valid) {
      for (let key in this.form.controls) {
        this.form.controls[key].markAsTouched();
      }
      return;
    }

    const {
      userName,
      displayName,
      email,
      notifyIncome,
      notifyBudgetAllocation,
      password = this.form.value.newPassword,
      notifyExpense,
      notifyTransfer,
      timezone
    } = this.form.value;

    // update profile
    this.budgetService.updateUser({
      ...this.user,
      userName,
      displayName,
      email,
      password,
      notifyIncome,
      notifyBudgetAllocation,
      notifyExpense,
      notifyTransfer,
      timezone
    });
  }
}
