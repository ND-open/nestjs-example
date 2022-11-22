import { Injectable, NotFoundException } from '@nestjs/common';
import UsersDto from './users.dto';
import UsersRepository from './users.repository';

type UserType = import('./users.repository').UserType;
export type UsersResponse = { users: UserType[] };
export type UserResponse = { users: UserType };

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * Get all users
   */
  public getAllUsers(): UsersResponse {
    const users = this.usersRepository.getAllUsers();

    return {
      users,
    };
  }

  /**
   * Get one user by it's id
   */
  public getOneUser(userId: UserType['userId']): UserResponse {
    const user = this.usersRepository.getOneUser(userId);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return {
      users: user,
    };
  }

  /**
   * Create a new user with data
   */
  public createUser(userDto: UsersDto): UserResponse {
    const user = this.usersRepository.createUser(userDto);

    return {
      users: user,
    };
  }

  /**
   * Update a user with it's id and data
   */
  public updateUser(
    userId: UserType['userId'],
    userDto: UsersDto,
  ): UserResponse {
    const user = this.usersRepository.updateUser(userId, userDto);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return {
      users: user,
    };
  }

  /**
   * Delete a user with it's id
   */
  public deleteUser(userId: UserType['userId']): UserResponse {
    const user = this.usersRepository.deleteUser(userId);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return {
      users: user,
    };
  }
}
