import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Recurrence } from '../../budget/recurrence.enum';



@Injectable()
export class MockBudgetService implements InMemoryDbService {
  createDb() {
    // for register.component
    // for login.component
    // for profile.component
    const users = [
      {
        id: 1,
        userName: 'Tatsushi Kiryu',
        displayName: 'tkiryu',
        email: 'tkiryu@infragistics.com',
        password: '1234567890',
        notifyIncome: true,
        notifyBudgetAllocation: false,
        notifyExpense: true,
        notifyTransfer: false,
        timezone: ''
      }
    ];

    // for add-income.component
    const incomes = [
      { id: 1, date: new Date('07-03-2018'), payee: 'Received payment according to contract #14251', amount: 150000 },
      { id: 2, date: new Date('04-23-2018'), payee: 'Received payment on consultancy work according to contract #231', amount: 50000 },
      { id: 3, date: new Date('04-12-2018'), payee: 'Received payment according to contract #14248', amount: 70000 },
      { id: 4, date: new Date('01-19-2018'), payee: 'Received payment on consultancy work according to contract #230', amount: 20000 },
      { id: 5, date: new Date('12-22-2017'), payee: 'Received payment according to contract #14247', amount: 140000 },
      { id: 6, date: new Date('10-05-2017'), payee: 'Received payment on consultancy work according to contract #227', amount: 23000 },
      { id: 7, date: new Date('09-28-2017'), payee: 'Received payment according to contract #14242', amount: 100000 },
    ];

    // for report.component
    // for budget-management.component
    // for home.component
    const budgets = [
      { id: 1, name: 'Salaries', amount: 61020, yearlyAmount: 61020 * 12, monthlyAmount: 61020, remaining: 61020, recurrence: Recurrence.Monthly },
      { id: 2, name: 'Office Materials', amount: 600, yearlyAmount: 600 * 12, monthlyAmount: 600, remaining: 450, recurrence: Recurrence.Monthly },
      { id: 3, name: 'Marketing', amount: 6700, yearlyAmount: 6700 * 12, monthlyAmount: 6700, remaining: 4700, recurrence: Recurrence.Monthly },
      { id: 4, name: 'Office Food', amount: 1000, yearlyAmount: 1000 * 12, monthlyAmount: 1000, remaining: 690, recurrence: Recurrence.Monthly },
      { id: 5, name: 'Electricity', amount: 2080, yearlyAmount: 2080 * 12, monthlyAmount: 2080, remaining: 2080, recurrence: Recurrence.Monthly },
      { id: 6, name: 'Internet', amount: 300, yearlyAmount: 300 * 12, monthlyAmount: 300, remaining: 0, recurrence: Recurrence.Monthly },
      { id: 7, name: 'Water', amount: 600, yearlyAmount: 600 * 12, monthlyAmount: 600, remaining: 0, recurrence: Recurrence.Monthly },
      { id: 8, name: 'Conference', amount: 11050, yearlyAmount: 11050 * 2, monthlyAmount: 11050 / 6, remaining: 11050, recurrence: Recurrence.EverySixMonths },
      { id: 9, name: 'Coaching', amount: 650, yearlyAmount: 650 * 2, monthlyAmount: 650 / 6, remaining: 350, recurrence: Recurrence.EverySixMonths },
    ];

    // for home.component
    const transactions = [
      { id: 1, date: new Date('06-08-2018'), type: '', payee: 'Coaching Budget Allocated', amount: 350, verified: false },
      { id: 2, date: new Date('02-10-2018'), type: '', payee: 'Issued payment of invoice #358723 by EventManageInc', amount: -2000, verified: false },
      { id: 3, date: new Date('09-27-2018'), type: '', payee: 'Payment to Sun Electric Co.', amount: -300, verified: true },
      { id: 4, date: new Date('07-03-2018'), type: '', payee: 'Received payment according to contract #14251', amount: 150000, verified: true },
      { id: 5, date: new Date('04-26-2018'), type: '', payee: 'Salaries Budget Allocated', amount: 61020, verified: true },
      { id: 6, date: new Date('04-25-2018'), type: '', payee: 'Coaching Budget Increase', amount: 150, verified: true },
      { id: 7, date: new Date('02-14-2018'), type: '', payee: 'Conferences Budget Allocated', amount: 11050, verified: true },
      { id: 8, date: new Date('02-05-2018'), type: '', payee: 'Payment to FruVeg Ltd.', amount: -200, verified: false },
      { id: 9, date: new Date('10-14-2018'), type: '', payee: 'Payment to ChocoCakes Ltd.', amount: -110, verified: true },
      { id: 10, date: new Date('04-23-2018'), type: '', payee: 'Received payment on consultancy work according to contract #231', amount: 50000, verified: true },
      { id: 11, date: new Date('12-23-2018'), type: '', payee: 'Office Food Budget Created', amount: 1000, verified: true },
      { id: 12, date: new Date('04-27-2018'), type: '', payee: 'Purchase from Office Supplies Ltd.', amount: -150, verified: true },
      { id: 13, date: new Date('04-22-2018'), type: '', payee: 'String', amount: 740, verified: true },
      { id: 14, date: new Date('09-10-2018'), type: '', payee: 'Payment to H20 supplier', amount: -600, verified: true },
      { id: 15, date: new Date('10-22-2018'), type: '', payee: 'Electricity Budget Created', amount: 2080, verified: true },
      { id: 16, date: new Date('10-09-2018'), type: '', payee: 'String', amount: 240, verified: true },
    ];

    return {
      users,
      incomes,
      budgets,
      transactions
    };
  }
}
