import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Rental } from './Rental';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  payment_id: string;

  @ManyToOne(() => Rental, rental => rental.rental_id)
  rental: Rental = new Rental;

  @Column('decimal')
  amount: number;

  @Column({ type: 'timestamp' })
  payment_date: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  constructor() {
    this.payment_id = '';
    this.amount = 0;
    this.payment_date = new Date();
    this.created_at = new Date();
  }
}
