import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IBicycle } from '@cycle-gram-web-main/shared/api';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { BicycleType } from 'libs/cycle-gram/features/src/lib/bicycle/bicycle.model';
import { IsMongoId } from 'class-validator';

export type BicycleDocument = Bicycle & Document;

@Schema()
export class Bicycle implements IBicycle {
    
    @IsMongoId()
    _id!: string;

    @Prop({
        unique: true,
      })
    id!: string;

    @Prop({ required: true })
    bicycleName!: string;

    @Prop({ required: true })
    Brand!: string;

    @Prop({ required: true })
    weight!: string;

    @Prop({ required: true })
    groupset!: string;

    @Prop({ required: true })
    image!: string;

    @Prop({ required: true })
    kleur!: string;
        
    @Prop({ required: true, type: String, enum: BicycleType})
    sort!: BicycleType;
}

export const BicycleSchema = SchemaFactory.createForClass(Bicycle);