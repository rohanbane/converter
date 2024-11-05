import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Rental } from './Rental';

@Entity()
export class RentalReturn {
  @PrimaryGeneratedColumn('uuid')
  return_id: string;

  @ManyToOne(() => Rental, rental => rental.rental_id)
  rental: Rental = new Rental;

  @Column({ type: 'timestamp' })
  return_date: Date;

  @Column({ nullable: true })
  condition?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  constructor() {
    this.return_id = '';
    this.return_date = new Date();
    this.condition = '';
    this.created_at = new Date();
  }
}
