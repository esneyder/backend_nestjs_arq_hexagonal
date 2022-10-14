import {
  IsString,
  IsUUID,
  IsOptional,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/auth/adapters/model/role.enum';

export class UserDto {
  @IsOptional()
  @IsUUID()
  readonly id: string;
  @IsString()
  readonly username: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly firstname: string;
  @IsString()
  readonly lastname: string;
  @IsArray()
  @IsEnum(Role, { each: true })
  readonly roles: Role[];
}

export class ChangeUserPasswordDto {
  @IsUUID()
  readonly id: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly newPassword: string;
}

export class LoginDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
}
