import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import UsersDto from './users.dto';
import UsersService from './users.service';

type UserType = import('./users.repository').UserType;
type UsersResponse = import('./users.service').UsersResponse;
type UserResponse = import('./users.service').UserResponse;

@Controller('/users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): UsersResponse {
    return this.usersService.getAllUsers();
  }

  @Get(':userId')
  getOneUser(
    @Param('userId', ParseIntPipe) userId: UserType['userId'],
  ): UserResponse {
    return this.usersService.getOneUser(userId);
  }

  @Post()
  createUser(@Body() usersDto: UsersDto): UserResponse {
    return this.usersService.createUser(usersDto);
  }

  @Put(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: UserType['userId'],
    @Body() usersDto: UsersDto,
  ): UserResponse {
    return this.usersService.updateUser(userId, usersDto);
  }

  @Delete(':userId')
  deleteUser(
    @Param('userId', ParseIntPipe) userId: UserType['userId'],
  ): UserResponse {
    return this.usersService.deleteUser(userId);
  }
}
