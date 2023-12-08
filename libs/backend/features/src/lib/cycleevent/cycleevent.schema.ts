import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose,{ Document } from 'mongoose';
import { ICycleEvent, IUser } from '@cycle-gram-web-main/shared/api';
import { IsMongoId } from 'class-validator';

export type CycleEventDocument = CycleEvent & Document;

@Schema()
export class CycleEvent implements ICycleEvent {
    @IsMongoId()
    _id!: string;

    @Prop({
        unique: true,
      })
    id!: string;

    @Prop({ required: true })
    date!: string;

    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    description!: string;

    @Prop({ required: true })
    location!: string;

    @Prop({ required: true })
    maxParticipants!: number;

    @Prop({ 
      type: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref : 'User' },
      }],
      default: []})
    participants!: IUser[];

    @Prop({ required: true, type: mongoose.Schema.Types.String, ref: 'User'})
    createdById!: string;

    @Prop({
      required: true,
    })
    routes!: string;
}

export const CycleEventSchema = SchemaFactory.createForClass(CycleEvent);