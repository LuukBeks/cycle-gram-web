import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environment } from '@cycle-gram-web/shared/util-env';
import { BackendFeaturesUserModule } from '@cycle-gram-web-main/backend/features';
import { BackendFeaturesBicycleModule } from '@cycle-gram-web-main/backend/features';

@Module({
  imports: [BackendFeaturesUserModule, BackendFeaturesBicycleModule, MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
    dbName: 'cycle-gram-web',
    connectionFactory: (connection) => {
      return connection;
    },
    connectionErrorFactory: (error) => {
      return error;
    },
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
