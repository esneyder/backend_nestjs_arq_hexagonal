import { Username } from '../value-objects/username';
import { UserPassword } from '../value-objects/userpassword';
import { User, UserCredentials } from './../model/User';
export interface IUserService {
  save(user: User): void;
  getUsersList(): User[];
  getUserById(id: string): User;
  getUserByUsername(username: string): User;
  validateUser(username: Username, password: UserPassword): User | null;
  updatePassword(user: UserCredentials, newPassword: UserPassword): void;
}
