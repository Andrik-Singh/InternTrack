import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectDrizzle } from '@nestjs/drizzle';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, InferSelectModel } from 'drizzle-orm';
import { userTable, companyTable } from 'src/db/schema';
import { handleDatabaseError } from 'src/common/drizzleError';
import { InputException, WrongPasswordException } from 'src/common/exceptions';
import bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import {
  type ChangePasswordDto,
  type CreateMemberDto,
  type UpdateUserDto,
} from './dto/user.dto';

type Uuid = `${string}-${string}-${string}-${string}-${string}`;

type UserRow = InferSelectModel<typeof userTable>;

export type SafeUser = Omit<UserRow, 'passwordHash'>;

@Injectable()
export class UserService {
  private toSafeUser(user: UserRow): SafeUser {
    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      companyId: user.companyId,
      avatar: user.avatar,
      role: user.role,
      active: user.active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  constructor(
    @InjectDrizzle() private readonly drizzle: NodePgDatabase,
    private readonly authService: AuthService,
  ) {}

  async getMe(userId: Uuid) {
    try {
      const [user] = await this.drizzle
        .select()
        .from(userTable)
        .where(eq(userTable.id, userId));
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return this.toSafeUser(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDatabaseError(error);
    }
  }

  async getUser(userId: Uuid) {
    try {
      const [user] = await this.drizzle
        .select()
        .from(userTable)
        .where(eq(userTable.id, userId));
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDatabaseError(error);
    }
  }

  async updateProfile(userId: Uuid, data: UpdateUserDto) {
    if (data.userName === undefined && data.avatar === undefined) {
      throw new InputException('Nothing to update');
    }
    try {
      await this.drizzle
        .update(userTable)
        .set({
          ...(data.userName !== undefined ? { userName: data.userName } : {}),
          ...(data.avatar !== undefined ? { avatar: data.avatar } : {}),
        })
        .where(eq(userTable.id, userId));
      return this.getMe(userId);
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async changePassword(userId: Uuid, data: ChangePasswordDto) {
    const user = await this.getUser(userId);
    let isValid;
    try {
      isValid = await bcrypt.compare(data.currentPassword, user.passwordHash);
      if (!isValid) {
        throw new WrongPasswordException('Invalid current password');
      }
    } catch (error) {
      if (error instanceof WrongPasswordException) {
        throw error;
      }
      throw new InternalServerErrorException('Bcrypt is not working');
    }
    try {
      const hashedPassword: string = await bcrypt.hash(data.newPassword, 12);
      await this.drizzle
        .update(userTable)
        .set({ passwordHash: hashedPassword })
        .where(eq(userTable.id, userId));
      return { message: 'Password updated successfully' };
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async createMember(data: CreateMemberDto) {
    const { token, newId } = await this.authService.createAccount(data);
    return {
      token,
      userId: newId,
    };
  }

  async deactivateUser(actorRole: string, targetId: Uuid) {
    if (actorRole !== 'ADMIN') {
      throw new ForbiddenException('Only admins can deactivate users');
    }
    try {
      await this.drizzle
        .update(userTable)
        .set({ active: false })
        .where(eq(userTable.id, targetId));
      return { message: 'User deactivated' };
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async getUserCompany(userId: Uuid) {
    try {
      const [user] = await this.drizzle
        .select()
        .from(userTable)
        .where(eq(userTable.id, userId));
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const [company] = await this.drizzle
        .select()
        .from(companyTable)
        .where(eq(companyTable.id, user.companyId));
      if (!company) {
        throw new NotFoundException('Company not found');
      }
      return { user: this.toSafeUser(user), company };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDatabaseError(error);
    }
  }

  async listCompanyUsers(companyId: Uuid) {
    try {
      const users = await this.drizzle
        .select()
        .from(userTable)
        .where(eq(userTable.companyId, companyId));
      return users.map((user) => this.toSafeUser(user));
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async getUserById(actorRole: string, targetId: Uuid) {
    if (actorRole !== 'ADMIN') {
      throw new ForbiddenException('Only admins can view user details');
    }
    try {
      const [user] = await this.drizzle
        .select()
        .from(userTable)
        .where(eq(userTable.id, targetId));
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return this.toSafeUser(user);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      handleDatabaseError(error);
    }
  }

  async updateUserRole(
    actorRole: string,
    targetId: Uuid,
    newRole: 'ADMIN' | 'INTERN' | 'MENTOR',
  ) {
    if (actorRole !== 'ADMIN') {
      throw new ForbiddenException('Only admins can update user roles');
    }
    try {
      const [user] = await this.drizzle
        .select()
        .from(userTable)
        .where(eq(userTable.id, targetId));
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.drizzle
        .update(userTable)
        .set({ role: newRole })
        .where(eq(userTable.id, targetId));
      return this.getUserById(actorRole, targetId);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      handleDatabaseError(error);
    }
  }

  async toggleUserActive(actorRole: string, targetId: Uuid) {
    if (actorRole !== 'ADMIN') {
      throw new ForbiddenException('Only admins can change user status');
    }
    try {
      const [user] = await this.drizzle
        .select()
        .from(userTable)
        .where(eq(userTable.id, targetId));
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.drizzle
        .update(userTable)
        .set({ active: !user.active })
        .where(eq(userTable.id, targetId));
      return {
        message: `User ${user.active ? 'deactivated' : 'activated'} successfully`,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      handleDatabaseError(error);
    }
  }

  async deleteUser(actorRole: string, targetId: Uuid) {
    if (actorRole !== 'ADMIN') {
      throw new ForbiddenException('Only admins can delete users');
    }
    try {
      const [user] = await this.drizzle
        .select()
        .from(userTable)
        .where(eq(userTable.id, targetId));
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.drizzle.delete(userTable).where(eq(userTable.id, targetId));
      return { message: 'User deleted successfully' };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      handleDatabaseError(error);
    }
  }
}
