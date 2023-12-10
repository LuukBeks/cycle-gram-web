import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bicycle, BicycleSchema } from './bicycle.shema';
import { BicycleController } from './bicycle.controller';
import { BicycleService } from '../bicycle.service';
import { UserService } from '../user.service'; // import UserService
import { User, UserSchema } from '../user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bicycle.name, schema: BicycleSchema },
      { name: User.name, schema: UserSchema },
    ]),
    User, // import UserModule if UserService is defined there
  ],
  controllers: [BicycleController],
  providers: [BicycleService, UserService], // add UserService to providers
  exports: [BicycleService],
})
export class BackendFeaturesBicycleModule {}
