import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller'; // Updated controller name
import { UserService } from '../user.service'; // Updated service name

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UserController], // Updated controller name
    providers: [UserService], // Updated service name
    exports: [UserService], // Updated service name
})
export class BackendFeaturesUserModule {} // Updated module name
