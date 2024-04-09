import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  backendUrl: 'http://localhost:3000/api',
  MONGO_DB_CONNECTION_STRING:
    'mongodb+srv://lbeks:PEhXKqcxLAdRtEeS@data-api-cycle-gram-web.wltvjnj.mongodb.net/',
  neo4j: {
    scheme: 'neo4j',
    host: 'localhost',
    password: 'cycle-gram',
    port: 7687,
    username: 'neo4j',
    database: 'neo4j',
  },
};
