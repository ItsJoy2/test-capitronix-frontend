export type TeamMember = {
    level: number;
    email: string;
    name: string;
    is_active: string;
    created_at: string;
    investment: number;
    team: TeamMember[]; 
  };
  
  export type TUser = {
    email: string;
    name: string;
    is_active: number;
    created_at: string;
  };
  
  export type TUserResponse = {
    status: boolean;
    user: TUser;
    team: TeamMember[];
  };
  