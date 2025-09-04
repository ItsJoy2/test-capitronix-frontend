export interface Transaction {
  id: number;
  transaction_id: string;
  user_id: string;
  amount: string;
  remark: string;
  type: string;
  status: string;
  details: string;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionnHistory {
  status: boolean;
  data: Transaction[];
  total: number;
  last_page: number;
  current_page: number;
  per_page: number;
  from: number;
}
