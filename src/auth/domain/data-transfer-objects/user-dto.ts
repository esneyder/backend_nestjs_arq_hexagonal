import { IsString, IsUUID, IsOptional } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsUUID()
  readonly id: string;
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly firstname: string;
  @IsString()
  readonly lastname: string;
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
