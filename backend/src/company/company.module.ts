import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { AuthModule } from 'src/auth/auth.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [AuthModule, LoggerModule],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
