import { Module } from '@nestjs/common';
import { BicycleController } from './bicycle.controller';
import { BicycleService } from '../bicycle.service'; 

@Module({
    controllers: [BicycleController], 
    providers: [BicycleService],
    exports: [BicycleService],
})
export class BackendFeaturesBicycleModule {}
