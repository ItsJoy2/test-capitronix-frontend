export type TUserProfileResponse = {
    status: boolean;
    message: string;
    data: TUserProfile
};

export type TUserProfile = {
    user: {
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
        is_active: string;
        is_block: string;
        kyc_status: string;
        created_at: string;
        updated_at: string;
    };
    usdt_wallet: string;
    bizt_wallet: string;
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
    generation_income : number
};