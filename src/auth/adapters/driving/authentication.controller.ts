import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam } from '@nestjs/swagger';
import {
  ChangeUserPasswordDto,
  LoginDto,
  UserDto,
} from 'src/auth/domain/data-transfer-objects/user-dto';
import { UserService } from 'src/auth/domain/inboudPorts/UserService';
import { User, UserCredentials } from 'src/auth/domain/model/User';
import { Username } from 'src/auth/domain/value-objects/username';
import { UserPassword } from 'src/auth/domain/value-objects/userpassword';
import { Role } from '../model/role.enum';
import { HasRoles } from './decorators/has-roles.decorator';
import { DomainExceptionFilter } from './error.filter';
import { RolesGuard } from './passport/roles.guard';

@Controller('/auth')
@UseFilters(new DomainExceptionFilter())
export class AuthenticationController {
  constructor(
    @Inject(UserService) private readonly usersService: UserService,
  ) {}
  @HasRoles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/user/all')
  async findAll(): Promise<User[]> {
    const users = this.usersService.getUsersList();
    return users;
  }
  @ApiParam({
    name: 'id',
    required: false,
    description: ' id usuario a consultar',
    type: String,
  })
  @HasRoles(Role.User, Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/user/:id')
  async findById(@Param('id') id): Promise<User> {
    const user = this.usersService.getUserById(id);
    return user;
  }
  @ApiParam({
    name: 'username',
    required: false,
    description: ' username usuario a consultar',
    type: String,
  })
  @HasRoles(Role.User, Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/user/by/:username')
  async findByUsername(@Param('username') username): Promise<User> {
    const user = this.usersService.getUserByUsername(username);
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/user/changepassword')
  async changePass(
    @Body(new ValidationPipe({ transform: true }))
    userData: ChangeUserPasswordDto,
  ) {
    const user = UserCredentials.create({
      id: userData.id,
      password: userData.password,
    } as UserDto);
    const res = this.usersService.updatePassword(
      user,
      new UserPassword(userData.newPassword),
    );
    return {
      message: 'password changed',
    };
  }

  @Post('register')
  registerNewUser(
    @Body(new ValidationPipe({ transform: true })) user: UserDto,
  ) {
    const newUser = User.create(user);
    this.usersService.save(newUser);
    return newUser.infoWithoutPassword();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body(new ValidationPipe({ transform: true })) user: LoginDto) {
    return this.usersService.validateUser(
      new Username(user.username),
      new UserPassword(user.password),
    );
  }
}
