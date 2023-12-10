import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import {
  ICreateCycleEvent,
  IUser,
  IUpdateCycleEvent,
  IUpsertCycleEvent,
} from '@cycle-gram-web-main/shared/api';

export class CreateCycleEventDto implements ICreateCycleEvent {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  date!: string;

  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  maxParticipants!: number;

  @IsString()
  @IsNotEmpty()
  participants!: IUser[];

  @IsString()
  @IsNotEmpty()
  createdById!: string;

  @IsString()
  @IsNotEmpty()
  routes!: string;
}

export class UpsertCycleEventDto implements IUpsertCycleEvent {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  date!: string;

  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  maxParticipants!: number;

  @IsString()
  @IsNotEmpty()
  participants!: IUser[];

  @IsString()
  @IsNotEmpty()
  createdById!: string;

  @IsString()
  @IsNotEmpty()
  routes!: string;
}

export class UpdateCycleEventDto implements IUpdateCycleEvent {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  date!: string;

  @IsOptional()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  maxParticipants!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  participants!: IUser[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  createdById!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  routes!: string;
}
