// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Ignite UI for Angular
import {
  IgxButtonModule,
  IgxCardModule,
  IgxCheckboxModule,
  IgxDatePickerModule,
  IgxDialogModule,
  IgxGridModule,
  IgxIconModule,
  IgxInputModule,
  IgxLabelModule,
  IgxListModule,
  IgxNavbarModule,
  IgxNavigationDrawerModule,
  IgxProgressBarModule,
  IgxRippleModule,
} from 'igniteui-angular/main';

import { BudgetRoutingModule } from './budget-routing.module';

import { HomeComponent } from './home/home.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { BudgetManagementComponent } from './budget-management/budget-management.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportsComponent } from './reports/reports.component';

import { Store } from './store';
import { BudgetService } from './budget.service';

@NgModule({
  imports: [
    // Angular modules
    CommonModule,
    ReactiveFormsModule,

    // Ignite UI for Angular modules
    IgxButtonModule,
    IgxCardModule,
    IgxCheckboxModule,
    IgxDatePickerModule,
    IgxDialogModule,
    IgxGridModule,
    IgxIconModule,
    IgxInputModule,
    IgxLabelModule,
    IgxListModule,
    IgxNavbarModule,
    IgxNavigationDrawerModule,
    IgxProgressBarModule,
    IgxRippleModule,

    // My modules
    BudgetRoutingModule,
  ],
  declarations: [
    HomeComponent,
    AddIncomeComponent,
    BudgetManagementComponent,
    ReportsComponent,
    ProfileComponent,
    AboutComponent,
  ],
  providers: [
    Store,
    BudgetService
  ]
})
export class BudgetModule { }
