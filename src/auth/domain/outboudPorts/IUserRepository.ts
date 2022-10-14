import { User, UserCredentials } from '../model/User';
import { Username } from '../value-objects/username';
import { UserPassword } from '../value-objects/userpassword';

export interface IUserRepository {
  getUserById(id: string): User;
  getUserByUsername(username: Username): User;
  getUsersList(): User[];
  save(user: User): void;
  validateUser(username: Username, password: UserPassword): User | null;
  updatePassword(user: UserCredentials, newPassword: UserPassword): void;
}

export const IUserRepository = Symbol('IUserRepository');
