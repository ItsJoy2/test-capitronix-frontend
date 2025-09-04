export interface Code {
  id: number;
  code: string;
  status: string;
  code_owner: number | null;
  user_name: string | null;
  created_at: string;
}

export interface CodesResponse {
  status: boolean;
  codes: Code[];
}
