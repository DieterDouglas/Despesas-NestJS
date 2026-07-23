import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';
import { ExpenseCategory } from '../expense-category.enum';

export class CreateExpenseDto {
  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsEnum(ExpenseCategory)
  category: ExpenseCategory;
}
