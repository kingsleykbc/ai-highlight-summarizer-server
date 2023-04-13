import { MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @MinLength(1)
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @MinLength(3)
  readonly password: string;
}
