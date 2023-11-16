import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendFeaturesUserModule } from '@cycle-gram-web-main/backend/features';

@Module({
  imports: [BackendFeaturesUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
