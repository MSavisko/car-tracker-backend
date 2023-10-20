import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  odometerType: 'km' | 'mile' | 'h';

  @Column()
  fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid' | 'Other';

  @Column()
  fuelUnit: string;

  @Column()
  tankCapacity: number;

  @Column({ type: 'date' })
  purchaseDate: Date;

  @Column()
  odometer: number;

  @Column({ type: 'decimal' })
  purchasePrice: number;

  @Column()
  currency: 'USD' | 'EURO' | 'UAH';

  @Column({ nullable: true })
  notes?: string;
}