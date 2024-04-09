import { Neo4jModule, Neo4jScheme } from 'nest-neo4j/dist';
import { NeoService } from '../neo.service';
import { Module } from '@nestjs/common';
import { environment } from '@cycle-gram-web/shared/util-env';


@Module({
    controllers: [],
    providers: [NeoService],
    imports: [
        Neo4jModule.forRoot({
            scheme: environment.neo4j.scheme as Neo4jScheme,
            host: environment.neo4j.host,
            port: environment.neo4j.port,
            username: environment.neo4j.username,
            password: environment.neo4j.password,
            database: environment.neo4j.database,
        }),
    ]
})
export class BackendFeaturesNeoModule {}
