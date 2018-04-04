export interface User {
  id: number;
  userName: string;
  displayName: string;
  email: string;
  password: string;
  notifyIncome: boolean;
  notifyBudgetAllocation: boolean;
  notifyExpense: boolean;
  notifyTransfer: boolean;
  timezone: string;
}
