export interface InvestmentPlan {
  id: number;
  user_id: string;
  package_name: string;
  package_id: string;
  return_type: string;
  investment: string;
  duration: string;
  payable_amount: string | null;
  total_receive: string;
  total_receive_day: string;
  total_due_day: string;
  start_date: string;
  next_cron: string;
  last_cron: string;
  created_at: string;
  updated_at: string;
  status: string;
  interest_rate: string;
  daily_roi: number;
}

export interface InvestmentPlanResponse {
  status: boolean;
  data: InvestmentPlan[];
  total: number;
  current_page: number;
  last_page: number;
}
