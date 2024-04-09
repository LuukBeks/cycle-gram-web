import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CycleRoute, CycleRouteSchema } from './cycleroute.schema';
import { CycleRouteController } from './cycleroute.controller';
import { CycleRouteService } from '../cycleroute.service';
import { User, UserSchema } from '../user/user.schema'; // import UserModule
import { UserService } from '../user.service';
import { BackendFeaturesNeoModule } from '../neo/backend-features-neo-module';
import { NeoService } from '../neo.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CycleRoute.name, schema: CycleRouteSchema },
      { name: User.name, schema: UserSchema },
    ]),
    BackendFeaturesNeoModule, // import NeoModule
    User, // import UserModule
  ],
  controllers: [CycleRouteController],
  providers: [CycleRouteService, UserService, NeoService],
  exports: [CycleRouteService],
})
export class BackendFeaturesCycleRouteModule {}
