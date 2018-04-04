import { Recurrence } from "./recurrence.enum";

export interface Budget {
  id: number;
  name: string;
  amount: number;
  recurrence: Recurrence;
  monthlyAmount?: number; // For now, it is calculated on the client side, but calculating it on the server side may be better.
  yearlyAmount?: number; // For now, it is calculated on the client side, but calculating it on the server side may be better.
  allocated?: number; // calucurated amount on transaction data
  remaining?: number; // calucurated amount on transaction data
}
