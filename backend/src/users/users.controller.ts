import { Controller, Get, Patch, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: { userId: string; email: string };
}

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findMe(@Req() req: AuthenticatedRequest) {
    return this.usersService.findPublicById(req.user.userId);
  }

  @Patch('me')
  updateMe(@Body() updateUserDto: UpdateUserDto, @Req() req: AuthenticatedRequest) {
    return this.usersService.update(req.user.userId, updateUserDto);
  }

  @Delete('me')
  removeMe(@Req() req: AuthenticatedRequest) {
    return this.usersService.remove(req.user.userId);
  }
}
