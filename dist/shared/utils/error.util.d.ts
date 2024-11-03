export default class AppError extends Error {
    statusCode: number;
    cause: Error | undefined;
    errorCode: string | undefined;
    isOperational: boolean;
    constructor(statusCode: number, message: any, cause?: any, errorCode?: string, isOperational?: boolean);
}
