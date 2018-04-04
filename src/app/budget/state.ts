import { Budget } from "./budget";
import { Transaction } from "./transaction";
import { Income } from "./income";
import { User } from "./user";

export interface State {
  budgets: Budget[],
  transactions: Transaction[],
  incomes: Income[],
  user: User
}
