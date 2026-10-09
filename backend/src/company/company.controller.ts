import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import {
  incomingRequestData,
  type IncomingNewCompanyRequestData,
} from './dto/create-company.dto';
import { InputException } from 'src/common/exceptions';
import { CompanyService } from './company.service';
import type { Request, Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    public readonly logger: LoggerService,
  ) {}
  @Post('new')
  async createCompany(
    @Body() body: IncomingNewCompanyRequestData,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    this.logger.info(JSON.stringify(req.cookies));
    const result = incomingRequestData.safeParse(body);
    if (!result.success) {
      throw new InputException('Either wrong user data or wrong company data');
    }
    const data = result.data;
    const userData = {
      userName: data.userName,
      email: data.email,
      password: data.password,
    };
    const companyData = {
      companyName: data.companyName,
      description: data.description,
      website: data.website,
      address: data.address,
    };
    this.logger.info(JSON.stringify(result.data));
    const { token, companyId, userId } =
      await this.companyService.createCompany(companyData, userData);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    this.logger.info(JSON.stringify(token));
    return {
      message: 'Company created succesfully',
      companyId,
      userId,
    };
  }
  @Get('check')
  checkCompany(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    this.logger.info(JSON.stringify(req.cookies.token));
    return {
      message: 'Cookie checked',
    };
  }
  @Get('delete')
  deleteCompany(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    res.clearCookie('token');
    return {
      message: 'Cookie cleared',
    };
  }
}
