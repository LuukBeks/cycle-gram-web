export interface IEnvironment {
    production: boolean;
    backendUrl: string;
    MONGO_DB_CONNECTION_STRING: string;
    neo4j: {
        scheme: string;
        host: string;
        password: string;
        port: number;
        username: string;
        database: string;
    };
}