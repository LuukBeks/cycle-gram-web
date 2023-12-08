import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CycleRoute, CycleRouteSchema } from './cycleroute.schema';
import { CycleRouteController } from './cycleroute.controller';
import { CycleRouteService } from '../cycleroute.service'; 

@Module({
    imports: [
        MongooseModule.forFeature([{ name: CycleRoute.name, schema: CycleRouteSchema }]),
    ],
    controllers: [CycleRouteController], 
    providers: [CycleRouteService],
    exports: [CycleRouteService],
})
export class BackendFeaturesCycleRouteModule {}
