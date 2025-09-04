export interface UserProfileResponse {
  status: boolean;
  message: string;
  data: {
    user: User;
    next_reword_time: null | string | undefined;
    deposit_wallet: string;
    profit_wallet: string;
    active_wallet: string;
    teamInvest: number;
    directRefer: number;
    totalTeam: number;
    total_active_team: number;
    total_inactive_team: number;
    reward: number;
    totalInvestment: number;
    totalWithdraw: number;
    totalTransfer: number;
    totalDeposit: number;
    totalEarning: number;
    totalReferBonus: number;
    generation_income: number;
  };
}

export type User = {
  id: number;
  name: string;
  image: string | null;
  birthday: string | null;
  nid_or_passport: string | null;
  address: string | null;
  email: string;
  mobile: string;
  refer_code: string;
  refer_by: string | null;
  is_active: "0" | "1";
  is_block: "0" | "1";
  kyc_status: string;
  created_at: string; // ISO Date string
  updated_at: string; // ISO Date string
};



