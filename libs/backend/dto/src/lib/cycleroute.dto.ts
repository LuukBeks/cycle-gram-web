import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ICreateCycleRoute, IUpdateCycleRoute, IUpsertCycleRoute } from '@cycle-gram-web-main/shared/api';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CycleRouteSort } from 'libs/cycle-gram/features/src/lib/cycleroute/cycleroute.model';

export class CreateCycleRouteDto implements ICreateCycleRoute {

    @IsString()
    @IsNotEmpty()
    id!: string;
  
    @IsString()
    @IsNotEmpty()
    routeName!: string;
  
    @IsNotEmpty()
    distance!: string;
  
    @IsString()
    @IsNotEmpty()
    image!: string;
  
    @IsString()
    @IsNotEmpty()
    gpx!: string;

    @IsString()
    @IsNotEmpty()
    startAdres!: string;
  
    @IsString()
    @IsNotEmpty()
    sort!: CycleRouteSort;
  }
  
  export class UpsertCycleRouteDto implements IUpsertCycleRoute {
    @IsString()
    @IsNotEmpty()
    id!: string;
  
    @IsString()
    @IsNotEmpty()
    routeName!: string;
  
    @IsNotEmpty()
    distance!: string;
  
    @IsString()
    @IsNotEmpty()
    image!: string;
  
    @IsString()
    @IsNotEmpty()
    gpx!: string;

    @IsString()
    @IsNotEmpty()
    startAdres!: string;
  
    @IsString()
    @IsNotEmpty()
    sort!: CycleRouteSort;
  }
  
  export class UpdateCycleRouteDto implements IUpdateCycleRoute {
    @IsString()
    @IsNotEmpty()
    id!: string;
  
    @IsString()
    @IsNotEmpty()
    routeName!: string;
  
    @IsNotEmpty()
    distance!: string;
  
    @IsString()
    @IsNotEmpty()
    image!: string;
  
    @IsString()
    @IsNotEmpty()
    gpx!: string;

    @IsString()
    @IsNotEmpty()
    startAdres!: string;
  
    @IsString()
    @IsNotEmpty()
    sort!: CycleRouteSort;
  }