export declare const AppConfig: {
    name: string;
    env: import("./env.config").NODE_ENV;
    port: number;
    host: string;
    key: string;
    environment: string;
    redis: {
        host: string;
        port: number;
        username: string;
        password: string;
    };
    trouveCore: {
        publicKey: string;
        baseUrl: string;
    };
    database: string;
    rabbitMq: {
        server: {
            address: string;
        };
    };
    kkiapay: {
        publicKey: string | undefined;
    };
    chipdeals: {
        publicKey: string;
        baseUrl: string;
    };
    mailer: {
        host: string;
        user: string;
        port: string;
        password: string;
        from: string | undefined;
    };
};
