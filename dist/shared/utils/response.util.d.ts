export declare const SuccessResponse: <T>(message: string, data: T) => {
    status: boolean;
    message: string;
    data: T;
};
export declare const ErrorResponse: (message: string, errors?: any[]) => {
    success: boolean;
    message: string;
    errors: any[] | undefined;
};
