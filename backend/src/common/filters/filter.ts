import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { InputException } from '../exceptions';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger();
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const stack = exception instanceof Error ? exception.stack : 'Unknown';
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message
        : typeof exception === 'string'
          ? exception
          : 'Internal Server Error';
    if (exception instanceof InputException) {
      this.logger.warn(message);
    } else {
      this.logger.error(message, stack);
    }
    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
