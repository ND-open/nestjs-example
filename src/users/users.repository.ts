import { Injectable } from '@nestjs/common';
import UsersDto from './users.dto';

export type UserType = {
  userId: number;
  fullname: string;
  email: string;
};

@Injectable()
export default class UsersRepository {
  private users: UserType[] = [];

  /**
   * Get all users
   */
  public getAllUsers(): UserType[] {
    return this.users;
  }

  /**
   * Get one user by it's id
   */
  public getOneUser(userId: UserType['userId']): UserType {
    const userIndex = this.users.findIndex((user) => user.userId === userId);

    if (userIndex === -1) {
      return null;
    }

    return this.users[userIndex];
  }

  /**
   * Create a new user with data
   */
  public createUser(userDto: UsersDto): UserType {
    /** New user id to be inserted */
    const newId =
      (this.users.length
        ? Math.max(...this.users.map((user) => user.userId))
        : 0) + 1;

    const userToBeInserted = { ...userDto, userId: newId };

    this.users.push(userToBeInserted);

    return userToBeInserted;
  }

  /**
   * Update a user with it's id and data
   */
  public updateUser(userId: UserType['userId'], userDto: UsersDto): UserType {
    const userIndex = this.users.findIndex((user) => user.userId === userId);

    if (userIndex === -1) {
      return null;
    }

    const userToBeUpdated = {
      ...this.users[userIndex],
      ...userDto,
    };

    this.users[userIndex] = userToBeUpdated;

    return userToBeUpdated;
  }

  /**
   * Delete a user with it's id
   */
  public deleteUser(userId: UserType['userId']): UserType {
    const userIndex = this.users.findIndex((user) => user.userId === userId);

    if (userIndex === -1) {
      return null;
    }

    const userToBeDeleted = this.users[userIndex];

    this.users.splice(userIndex);

    return userToBeDeleted;
  }
}
