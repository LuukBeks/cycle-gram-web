import { Controller, Put, Delete } from '@nestjs/common';
import { BicycleService } from '../bicycle.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IBicycle } from '@cycle-gram-web-main/shared/api';
import { CreateBicycleDto } from '@cycle-gram-web-main/backend/dto';

@Controller('bicycle')
export class BicycleController {
    constructor(private bicycleService: BicycleService) {}

    @Get('')
    getAll(): IBicycle[] {
        return this.bicycleService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): IBicycle {
        return this.bicycleService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateBicycleDto): IBicycle {
        return this.bicycleService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: IBicycle): IBicycle {
        return this.bicycleService.update(id, data);
    }

    @Delete(':id')
    deleteBicycle(@Param('id') id: string): void {
        this.bicycleService.deleteBicycle(id);
    }
}