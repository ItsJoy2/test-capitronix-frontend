// types/withdrawal.ts

export type WithdrawalSuccessResponse = {
    data: {
        status: true;
        message: string;
        wallet_balance: number;
    }
};
export type WithdrawalErrorResponse = {
    data: {
        status: false;
        message: string;
    }
};

export type WithdrawalResponse = WithdrawalSuccessResponse | WithdrawalErrorResponse;
