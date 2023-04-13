import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { AuthenticatedRequest } from 'src/auth/authenticated-request.interface';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return this.authService.login(user);
    } catch (e) {
      if (e.type === 'input') {
        throw new BadRequestException(e.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Post('login')
  async logIn(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() req: AuthenticatedRequest) {
    // TODO: implement logout
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/profile')
  async getUserProfile(@Req() req: AuthenticatedRequest) {
    const { name, email, _id, createdAt } = req.user;
    return { name, email, _id, createdAt };
  }
}
