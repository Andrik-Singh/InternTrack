import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import type { CreateUserDto } from './dto/createUser-dto';
import { signinUserSchema, type SigninUserDto } from './dto/signinUser.dto';
import { InputException } from 'src/common/exceptions';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('create-account')
  async login(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, newId } = await this.authService.createAccount(body);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 24 * 1000 * 7,
    });
    return {
      message: 'Succesfully created account',
      userId: newId,
    };
  }
  @Post('signin')
  async signin(
    @Body() body: SigninUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = signinUserSchema.safeParse(body);
    if (!result.success) {
      throw new InputException(JSON.stringify(result.error));
    }
    const { token, id } = await this.authService.signIn(result.data);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 24 * 1000 * 7,
    });
    return {
      message: 'Succesfully signed in',
      userId: id,
    };
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return {
      message: 'Succesfully signed out',
    };
  }
}
