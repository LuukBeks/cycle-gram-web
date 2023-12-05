import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IUser } from '@cycle-gram-web-main/shared/api';
import { UserSort } from 'libs/cycle-gram/features/src/lib/user/user.model';
import { IsMongoId } from 'class-validator';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
    @IsMongoId()
    _id!: string;

    @Prop({
        unique: true,
      })
    id!: string;

    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    dob!: Date;

    @Prop({ required: true })
    email!: string;

    @Prop({ required: true })
    phoneNumber!: string;

    @Prop({ required: true })
    password!: string;

    @Prop({ required: true })
    image!: string;
    
    @Prop({ required: true, type: String, enum: UserSort})  // Specify the enum type here
    sort!: UserSort.Admin;
}

export const UserSchema = SchemaFactory.createForClass(User);