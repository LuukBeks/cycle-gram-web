import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bicycle, BicycleSchema } from './bicycle.shema';
import { BicycleController } from './bicycle.controller';
import { BicycleService } from '../bicycle.service'; 

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Bicycle.name, schema: BicycleSchema }]),
    ],
    controllers: [BicycleController], 
    providers: [BicycleService],
    exports: [BicycleService],
})
export class BackendFeaturesBicycleModule {}
