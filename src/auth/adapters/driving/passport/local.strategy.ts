import { Strategy } from 'passport-local';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { IUserRepository } from 'src/auth/domain/outboudPorts/IUserRepository';
import { Username } from 'src/auth/domain/value-objects/username';
import { UserPassword } from 'src/auth/domain/value-objects/userpassword';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(IUserRepository) private readonly usersRepository: IUserRepository,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.validateUser(
      new Username(username),
      new UserPassword(password),
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
