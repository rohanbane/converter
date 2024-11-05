import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  rental_id: string;

  @ManyToOne(() => User, user => user.userid)
  user!: User;

  @ManyToOne(() => Product, product => product.pid)
  product!: Product;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column({ default: false })
  returned: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  constructor() {
    this.rental_id = '';
    this.start_date = new Date();
    this.end_date = new Date();
    this.returned = false;
    this.created_at = new Date();
  }
}
