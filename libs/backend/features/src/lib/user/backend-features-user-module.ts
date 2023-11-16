import { Module } from '@nestjs/common';
import { UserController } from './user.controller'; // Updated controller name
import { UserService } from '../user.service'; // Updated service name

@Module({
    controllers: [UserController], // Updated controller name
    providers: [UserService], // Updated service name
    exports: [UserService], // Updated service name
})
export class BackendFeaturesUserModule {} // Updated module name
