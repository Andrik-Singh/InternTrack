import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto, createUserSchema } from './dto/createUser-dto';
import { InjectDrizzle } from '@nestjs/drizzle';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { userTable } from 'src/db/schema';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { InputException, WrongPasswordException } from 'src/common/exceptions';
import { handleDatabaseError } from 'src/common/drizzleError';
import { JwtService } from '@nestjs/jwt';
import { type SigninUserDto } from './dto/signinUser.dto';
import { eq } from 'drizzle-orm';
@Injectable()
export class AuthService {
  constructor(
    @InjectDrizzle()
    private readonly db: NodePgDatabase,
    private readonly jwtService: JwtService,
  ) {}
  async createAccount(unsafeData: CreateUserDto): Promise<{
    token: string;
    newId: `${string}-${string}-${string}-${string}-${string}`;
  }> {
    try {
      const { data, success } = createUserSchema.safeParse(unsafeData);
      if (!success) {
        throw new InputException('Invalid Data passed');
      }
      const newId = randomUUID();
      const hashedPassword: string = await bcrypt.hash(data.password, 12);
      await this.db.insert(userTable).values({
        id: newId,
        companyId: data.companyId,
        userName: data.userName,
        passwordHash: hashedPassword,
        email: data.email,
        active: true,
        role: data.role,
      });
      const payload = {
        sub: newId,
        role: data.role,
      };
      const token = await this.signToken(payload);
      return {
        token,
        newId,
      };
    } catch (e) {
      handleDatabaseError(e);
    }
  }
  async signToken(payload: Record<string, unknown>): Promise<string> {
    try {
      const token = await this.jwtService.signAsync(payload);
      return token;
    } catch (e) {
      throw new InternalServerErrorException('JWT is not working');
    }
  }
  async signIn(payload: SigninUserDto): Promise<{
    token: string;
    id: string;
  }> {
    const { email, password } = payload;
    let data;
    try {
      [data] = await this.db
        .select()
        .from(userTable)
        .where(eq(userTable.email, email));
    } catch (e) {
      handleDatabaseError(e);
    }
    const { passwordHash, role, id } = data;
    let isValid;
    try {
      isValid = await bcrypt.compare(password, passwordHash);
      if (!isValid) {
        throw new WrongPasswordException('Invalid credentials');
      }
    } catch (e) {
      if(e instanceof WrongPasswordException) {
        throw e;
      }
      throw new InternalServerErrorException('Bcrypt is not working');
    }
    const token = await this.signToken({
      sub: id,
      role,
    });
    return {
      token,
      id,
    };
  }
  forgetPassword() {}
  resetPassword() {}
  signOut() {}
  verifyEmail() {}
}
