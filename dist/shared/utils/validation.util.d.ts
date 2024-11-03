type Error = {
    field: string;
    message: string;
};
export declare const createValidationError: (validationError: []) => Error[];
export {};
