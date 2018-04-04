import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { BudgetManagementComponent } from './budget-management/budget-management.component';
import { ReportsComponent } from './reports/reports.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '',
    children: [
      { path: '', component: HomeComponent, },
      { path: 'add-income', component: AddIncomeComponent },
      { path: 'budget-management', component: BudgetManagementComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'about', component: AboutComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
