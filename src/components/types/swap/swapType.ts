// types/conversion.ts

export type ConversionSuccessResponse = {
    data: {
        status: true;
        message: string;
        wallet: number;
    }
};

export type ConversionErrorResponse = {
    data: {
        status: false;
        message: string;
    }
};

export type ConversionResponse = ConversionSuccessResponse | ConversionErrorResponse;
