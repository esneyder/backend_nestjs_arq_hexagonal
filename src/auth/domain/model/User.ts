import { Role } from 'src/auth/adapters/model/role.enum';
import { v4 as uuid } from 'uuid';
import { UserDto } from '../data-transfer-objects/user-dto';
import { Username } from '../value-objects/username';
import { UserPassword } from '../value-objects/userpassword';

export class User {
  readonly id: string;
  readonly username: Username;
  readonly password: UserPassword;
  readonly firstname: string;
  readonly email: string;
  readonly lastname: string;
  readonly roles: Role[];

  constructor(
    id: string,
    username: Username,
    password: UserPassword,
    email: string,
    firstname: string,
    lastname: string,
    roles: Role[],
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.roles = roles;
  }

  getFullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  infoWithoutPassword(): any {
    return {
      id: this.id,
      username: this.username.value,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      roles: this.roles,
    };
  }

  asDTO(): UserDto {
    return {
      id: this.id,
      username: this.username.value,
      password: this.password.value,
      firstname: this.firstname,
      lastname: this.lastname,
      roles: this.roles,
    } as UserDto;
  }

  extend(patch: User): User {
    return new User(
      patch.id || this.id,
      patch.username || this.username,
      patch.password || this.password,
      patch.email || this.email,
      patch.firstname || this.firstname,
      patch.lastname || this.lastname,
      patch.roles || this.roles,
    );
  }

  static create(user: UserDto): User {
    return new User(
      user.id || uuid(),
      new Username(user.username),
      new UserPassword(user.password),
      user.email,
      user.firstname,
      user.lastname,
      user.roles,
    );
  }
}

export class UserCredentials {
  readonly id: string;
  readonly password: UserPassword;

  constructor(id: string, password: UserPassword) {
    this.id = id;
    this.password = password;
  }

  static create(user: UserDto): UserCredentials {
    return new UserCredentials(user.id, new UserPassword(user.password));
  }
}
