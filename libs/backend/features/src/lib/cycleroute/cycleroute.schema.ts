import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ICycleRoute } from '@cycle-gram-web-main/shared/api';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CycleRouteSort } from 'libs/cycle-gram/features/src/lib/cycleroute/cycleroute.model';
import { IsMongoId } from 'class-validator';

export type CycleRouteDocument = CycleRoute & Document;

@Schema()
export class CycleRoute implements ICycleRoute {
    
    @IsMongoId()
    _id!: string;

    @Prop({
        unique: true,
      })
    id!: string;

    @Prop({ required: true })
    routeName!: string;
  
    @Prop({ required: true })
    distance!: string;
  
    @Prop({ required: true })
    image!: string;
  
    @Prop({ required: true })
    gpx!: string;

    @Prop({ required: true })
    startAdres!: string;
  
    @Prop({ required: true, type: String, enum: CycleRouteSort})
    sort!: CycleRouteSort;
}

export const CycleRouteSchema = SchemaFactory.createForClass(CycleRoute);