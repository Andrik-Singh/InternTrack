import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
const DEFAULT_CODES: Record<number, string> = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  422: 'UNPROCESSABLE',
  429: 'TOO_MANY_REQUESTS',
  503: 'SERVICE_UNAVAILABLE',
};

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger();
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
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
    const line = `${req.method} ${req.originalUrl} -> ${status} : ${message}`;
    if (status >= 500) {
      this.logger.error(line, stack);
    } else {
      this.logger.warn(line);
    }
    response.status(status).json({
      statusCode: status,
      message,
      code: DEFAULT_CODES[status] ?? 'Internal Server error',
    });
  }
}
