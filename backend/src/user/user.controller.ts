import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import { InputException } from 'src/common/exceptions';
import { UserService } from './user.service';
import {
  changePasswordSchema,
  createMemberSchema,
  updateUserSchema,
  updateUserRoleSchema,
} from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';

type Uuid = `${string}-${string}-${string}-${string}-${string}`;

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('me')
  async me(@Req() req: Request) {
    const { sub } = await this.authService.verifyToken(req);
    return this.userService.getMe(sub);
  }

  @Patch('me')
  async updateMe(@Req() req: Request, @Body() body: unknown) {
    const { sub } = await this.authService.verifyToken(req);
    const result = updateUserSchema.safeParse(body);
    if (!result.success) {
      throw new InputException(JSON.stringify(result.error));
    }
    return this.userService.updateProfile(sub, result.data);
  }

  @Post('me/password')
  async changePassword(@Req() req: Request, @Body() body: unknown) {
    const { sub } = await this.authService.verifyToken(req);
    const result = changePasswordSchema.safeParse(body);
    if (!result.success) {
      throw new InputException(JSON.stringify(result.error));
    }
    return this.userService.changePassword(sub, result.data);
  }

  @Post('new')
  async createMember(
    @Req() req: Request,
    @Body() body: unknown,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { role } = await this.authService.verifyToken(req);
    if (role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can create users');
    }
    const result = createMemberSchema.safeParse(body);
    if (!result.success) {
      throw new InputException(JSON.stringify(result.error));
    }
    const { token, userId } = await this.userService.createMember(result.data);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return {
      message: 'User created successfully',
      userId,
    };
  }

  @Get('company/:companyId')
  async listCompanyUsers(
    @Req() req: Request,
    @Param('companyId') companyId: string,
  ) {
    const { role } = await this.authService.verifyToken(req);
    if (role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can list users');
    }
    return this.userService.listCompanyUsers(companyId as Uuid);
  }

  @Get('admin/:userId')
  async getUserById(@Req() req: Request, @Param('userId') userId: string) {
    const { role } = await this.authService.verifyToken(req);
    return this.userService.getUserById(role, userId as Uuid);
  }

  @Patch('admin/:userId/role')
  async updateUserRole(
    @Req() req: Request,
    @Param('userId') userId: string,
    @Body() body: unknown,
  ) {
    const { role } = await this.authService.verifyToken(req);
    const result = updateUserRoleSchema.safeParse(body);
    if (!result.success) {
      throw new InputException(JSON.stringify(result.error));
    }
    return this.userService.updateUserRole(
      role,
      userId as Uuid,
      result.data.role,
    );
  }

  @Patch('admin/:userId/toggle-active')
  async toggleUserActive(@Req() req: Request, @Param('userId') userId: string) {
    const { role } = await this.authService.verifyToken(req);
    return this.userService.toggleUserActive(role, userId as Uuid);
  }
}
