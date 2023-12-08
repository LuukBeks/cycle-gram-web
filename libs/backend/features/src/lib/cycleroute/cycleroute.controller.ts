import { Controller, Put, Delete } from '@nestjs/common';
import { CycleRouteService } from '../cycleroute.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { ICycleRoute } from '@cycle-gram-web-main/shared/api';
import { CreateCycleRouteDto } from '@cycle-gram-web-main/backend/dto';

@Controller('cycleroute')
export class CycleRouteController {
    constructor(private cyclerouteService: CycleRouteService) {}

    @Get('')
    getAll(): Promise<ICycleRoute[]> {
        return this.cyclerouteService.getAll();
    }

    @Post('')
    create(@Body() data: CreateCycleRouteDto): Promise<ICycleRoute> {
        return this.cyclerouteService.create(data);
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<ICycleRoute | null> {
        return this.cyclerouteService.getOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: ICycleRoute): Promise<ICycleRoute | null> {
        return this.cyclerouteService.update(id, data);
    }

    @Delete(':id')
    deleteCycleRoute(@Param('id') id: string): Promise<void> {
        return this.cyclerouteService.deleteCycleRoute(id);
    }
}