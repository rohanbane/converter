import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  userid!: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'USER' })
  user_role: string;

  @Column()
  passwordhash: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registered_at: Date;

  @Column({ nullable: true })
  user_ip?: string;

  @Column({ default: false })
  active: boolean;

  @Column({ nullable: true, unique: true })
  token?: string;

  @Column({ nullable: true })
  expiry?: string;

  constructor() {
    this.username = '';
    this.email = '';
    this.user_role = 'USER';
    this.passwordhash = '';
    this.registered_at = new Date();
    this.active = false;
  }
}

export { User };
