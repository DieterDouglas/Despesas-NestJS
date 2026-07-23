import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ExpenseCategory } from '../expense-category.enum';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: ExpenseCategory })
  category: ExpenseCategory;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.expenses, { onDelete: 'CASCADE' })
  user: User;
}
