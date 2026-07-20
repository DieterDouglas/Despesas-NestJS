import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expensesRepository: Repository<Expense>,
  ) {}

  create(createExpenseDto: CreateExpenseDto, userId: string) {
    const expense = this.expensesRepository.create({
      ...createExpenseDto,
      user: { id: userId },
    });
    return this.expensesRepository.save(expense);
  }

  findAll(userId: string) {
    return this.expensesRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: string, userId: string) {
    const expense = await this.expensesRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto, userId: string) {
    await this.findOne(id, userId);
    await this.expensesRepository.update(id, updateExpenseDto);
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.expensesRepository.delete(id);
  }
}
