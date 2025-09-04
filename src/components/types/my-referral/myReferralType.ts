export interface ReferUser {
  id: number;
  name: string;
  refer_by: string;
  email: string;
  is_active: string;
  created_at: string;
  investment: string;
}

export interface UserResponse {
  status: boolean;
  data: ReferUser[];
  total: number;
  per_page: number;
  page: number;
  current_page: number;
  last_page: number;
  from: number;
}
