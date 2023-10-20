import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {

    constructor(
        @InjectRepository(Car)
        private carRepository: Repository<Car>,
    ) { }

    findAll(): Promise<Car[]> {
        return this.carRepository.find();
    }

    async findOne(id: number): Promise<Car> {
        const car = await this.carRepository.findOneBy({ id })
        if (!car) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }
        return car;
    }

    create(car: Car): Promise<Car> {
        return this.carRepository.save(car);
    }

    update(id: number, car: Car): Promise<Car> {
        return this.carRepository.save({ ...car, id: id });
    }

    async remove(id: number): Promise<void> {
        await this.carRepository.delete(id);
    }
}
