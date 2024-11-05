import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  pid!: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  summary: string;

  @Column('decimal')
  price: number;

  constructor() {
    this.title = '';
    this.image = '';
    this.created_at = new Date();
    this.summary = '';
    this.price = 0;
  }
}
