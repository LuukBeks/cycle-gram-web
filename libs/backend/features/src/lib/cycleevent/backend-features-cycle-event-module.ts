import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CycleEvent, CycleEventSchema } from './cycleevent.schema';
import { CycleEventController } from './cycleevent.controller';
import { CycleEventService } from '../cycleevent.service';
import { UserSchema, User } from '../user/user.schema';
import { CycleRoute, CycleRouteSchema } from '../cycleroute/cycleroute.schema';
import { UserService } from '../user.service'; // Import UserService

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CycleEvent.name, schema: CycleEventSchema },
      { name: User.name, schema: UserSchema },
      { name: CycleRoute.name, schema: CycleRouteSchema },
    ]),
  ],
  controllers: [CycleEventController],
  providers: [CycleEventService, UserService], // Include UserService in providers
  exports: [CycleEventService],
})
export class BackendFeaturesCycleEventModule {}
