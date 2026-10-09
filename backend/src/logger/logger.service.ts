import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  constructor() {}
  error(message: string, stack?: string) {
    console.error(`[ ${message} ]`, stack);
  }
  warn(message: string) {
    console.warn(`[ ${message}`);
  }
  info(message: string) {
    console.info(`[ ${message}`);
  }
}
