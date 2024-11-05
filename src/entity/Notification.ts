import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Rental } from './Rental';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  notification_id: string;

  @ManyToOne(() => User, user => user.userid)
  user: User = new User;

  @ManyToOne(() => Rental, rental => rental.rental_id)
  rental: Rental = new Rental;

  @Column()
  message: string;

  @Column({ default: false })
  is_read: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  constructor() {
    this.notification_id = '';
    this.message = '';
    this.is_read = false;
    this.created_at = new Date();
  }
}
