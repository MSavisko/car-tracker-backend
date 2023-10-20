import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';

@Injectable()
export class CarsService {

    constructor(
        @InjectRepository(Car)
        private carRepository: Repository<Car>,
    ) { }

    findAll(): Promise<Car[]> {
        return this.carRepository.find();
    }

    findOne(id: number): Promise<Car | null> {
        return this.carRepository.findOneBy({ id })
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
