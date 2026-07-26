import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async findPublicById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password: _password, ...publicUser } = user;
    return publicUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { password: _password, ...safeUpdate } = updateUserDto;
    return this.usersRepository.update(id, safeUpdate);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
