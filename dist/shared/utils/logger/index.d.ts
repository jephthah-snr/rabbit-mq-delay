declare const logger: import("pino").Logger<{
    enabled: true;
    mixin(): {
        service: string;
    };
    serializers: {
        req(req: any): {
            method: any;
            headers: any;
            ip: any;
            url: any;
            path: any;
            params: any;
            query: any;
            body: any;
        };
        res(res: any): {
            statusCode: any;
            headers: any;
            body: any;
        };
        err(err: any): {
            id: any;
            type: any;
            code: any;
            message: any;
            stack: any;
        };
    };
    redact: string[];
}>;
export default logger;
