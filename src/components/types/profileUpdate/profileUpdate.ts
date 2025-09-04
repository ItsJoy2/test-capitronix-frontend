interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  country: string;
  country_code: string;
  deposit_wallet: string;
  profit_wallet: string;
  active_wallet: string;
  refer_code: string;
  refer_by: string | null;
  is_active: string; // looks like "0" | "1" but returned as string
  is_block: string; // same as above
  kyc_status: string; // same as above
  email_verified_at: string | null;
  role: string;
  created_at: string;
  updated_at: string;
  birthday: string | null;
  nid_or_passport: string | null;
  address: string;
  image: string;
}

export interface ProfileUpdateResponse {
  data: {
    status: boolean;
    message: string;
    user: User;
  };
}
