import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller'; // Updated controller name
import { UserService } from '../user.service'; // Updated service name
import { Bicycle, BicycleSchema } from '../bicycle/bicycle.shema';
import { CycleRoute, CycleRouteSchema } from '../cycleroute/cycleroute.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Bicycle.name, schema: BicycleSchema }, {name: CycleRoute.name, schema: CycleRouteSchema}]),
    ],
    controllers: [UserController], // Updated controller name
    providers: [UserService], // Updated service name
    exports: [UserService], // Updated service name
})
export class BackendFeaturesUserModule {} // Updated module name
