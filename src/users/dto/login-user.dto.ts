import { IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  readonly email: string;
  readonly password: string;
}
