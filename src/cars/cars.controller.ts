import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './car.entity';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) { }

    @Get()
    findAll(): Promise<Car[]> {
        return this.carsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Car> {
        return this.carsService.findOne(id);
    }

    @Post()
    create(@Body() car: Car): Promise<Car> {
        return this.carsService.create(car);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() car: Car): Promise<Car> {
        return this.carsService.update(id, car);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.carsService.remove(id);
    }
}
