export type TeamMember = {
  level: number;
  email: string;
  name: string;
  image: string | null;
  total_earned: string;
  teamInvest: string;
  is_active: string;
  created_at: string;
  investment: number;
  team: TeamMember[];
};

export type User = {
  email: string;
  name: string;
  is_active: string;
  created_at: string;
  image: string | null;
};

export type TeamDataResponse = {
  status: boolean;
  user: User;
  my_earnings: string;
  my_team_invest: string;
  team: TeamMember[];
};
