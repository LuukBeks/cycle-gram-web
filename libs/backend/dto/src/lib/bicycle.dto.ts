import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ICreateBicycle, IUpdateBicycle, IUpsertBicycle } from '@cycle-gram-web-main/shared/api';
import { BicycleType } from 'libs/cycle-gram/features/src/lib/bicycle/bicycle.model';

export class CreateBicycleDto implements ICreateBicycle {
    @IsString()
    @IsNotEmpty()
    bicycleName!: string;

    @IsString()
    @IsNotEmpty()
    Brand!: string;

    @IsString()
    @IsNotEmpty()
    weight!: string;

    @IsString()
    @IsNotEmpty()
    groupset!: string;

    @IsString()
    @IsNotEmpty()
    kleur!: string;

    @IsString()
    @IsNotEmpty()
    image!: string;

    @IsString()
    @IsNotEmpty()
    sort!: BicycleType;
}


export class UpsertBicycleDto implements IUpsertBicycle {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    bicycleName!: string;

    @IsString()
    @IsNotEmpty()
    Brand!: string;

    @IsString()
    @IsNotEmpty()
    weight!: string;

    @IsString()
    @IsNotEmpty()
    groupset!: string;

    @IsString()
    @IsNotEmpty()
    kleur!: string;

    @IsString()
    @IsNotEmpty()
    image!: string;

    @IsString()
    @IsNotEmpty()
    sort!: BicycleType;
}


export class UpdateBicycleDto implements IUpdateBicycle {
    @IsString()
    @IsOptional()
    bicycleName?: string;

    @IsString()
    @IsOptional()
    Brand?: string;

    @IsString()
    @IsOptional()
    weight?: string;

    @IsString()
    @IsOptional()
    groupset?: string;

    @IsString()
    @IsOptional()
    kleur?: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsOptional()
    sort?: BicycleType;
}
