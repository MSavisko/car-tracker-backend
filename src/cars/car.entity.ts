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
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid' | 'other';

  @Column()
  fuelUnit: 'liter' | 'gal';

  @Column()
  tankCapacity: number;

  @Column({ type: 'date' })
  purchaseDate: Date;

  @Column()
  odometer: number;

  @Column({ type: 'decimal' })
  purchasePrice: number;

  @Column()
  currency: 'usd' | 'euro' | 'uah';

  @Column({ nullable: true })
  notes?: string;
}