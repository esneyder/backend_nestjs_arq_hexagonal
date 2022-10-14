import { IUserRepository } from './../outboudPorts/IUserRepository';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IUserService } from './IUserService';
import { JwtService } from '@nestjs/jwt';
import { User, UserCredentials } from '../model/User';
import { Username } from '../value-objects/username';
import { UserPassword } from '../value-objects/userpassword';
import { DomainError } from '../domain-error';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}
  save(user: User): void {
    if (this.userRepository.getUserById(user.id)) {
      throw new DomainError(`The user with id ${user.id} already exists.`);
    }
    this.userRepository.save(user);
  }
  getUsersList(): User[] {
    return this.userRepository.getUsersList();
  }
  getUserById(id: string): User {
    return this.userRepository.getUserById(id);
  }
  getUserByUsername(username: string): User {
    return this.userRepository.getUserByUsername(new Username(username));
  }
  validateUser(_username: Username, _password: UserPassword): any {
    const dataUser = this.userRepository.getUserByUsername(_username);
    if (!dataUser) {
      throw new ConflictException();
    }
    const user = new User(
      dataUser.id,
      _username,
      _password,
      dataUser.email,
      dataUser.firstname,
      dataUser.lastname,
      dataUser.roles,
    );
    const payload = user.infoWithoutPassword();
    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
    };
  }
  updatePassword(user: UserCredentials, newPassword: UserPassword): boolean {
    this.userRepository.updatePassword(user, newPassword);
    return true;
  }
}
