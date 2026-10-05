import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
export class DbException extends HttpException {
  constructor(message: string) {
    super(message, 500);
    this.message = message;
  }
}
export class InputException extends BadRequestException {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
export class WrongPasswordException extends UnauthorizedException {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
