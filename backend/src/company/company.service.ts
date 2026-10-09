import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { type CreateCompanyDto, type UserData } from './dto/create-company.dto';
import { handleDatabaseError } from 'src/common/drizzleError';
import { randomUUID } from 'crypto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { companyTable } from 'src/db/schema';
import { InjectDrizzle } from '@nestjs/drizzle';

@Injectable()
export class CompanyService {
  constructor(
    private readonly authService: AuthService,
    @InjectDrizzle() private readonly db: NodePgDatabase,
  ) {}
  async createCompany(
    companyData: CreateCompanyDto,
    userData: UserData,
  ): Promise<{
    token: string;
    companyId: `${string}-${string}-${string}-${string}-${string}`;
    userId: `${string}-${string}-${string}-${string}-${string}`;
  }> {
    try {
      const data = companyData;
      const randomId = randomUUID();
      await this.db.insert(companyTable).values({
        id: randomId,
        website: data.website,
        name: data.companyName,
        description: data.description,
        address: data.address,
      });
      const { token, newId } = await this.authService.createAccount({
        ...userData,
        role: 'ADMIN',
        companyId: randomId,
      });
      return {
        token,
        companyId: randomId,
        userId: newId,
      };
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}
