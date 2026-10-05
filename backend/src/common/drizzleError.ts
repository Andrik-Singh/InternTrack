import { ConflictException, BadRequestException } from '@nestjs/common';
import { DbException } from './exceptions';
import { DatabaseError } from 'pg';

export function handleDatabaseError(error: unknown): never {
  console.dir(error, { depth: 10 });
  const err =
    (error as { cause?: DatabaseError })?.cause ?? (error as DatabaseError);
  switch (err?.code) {
    case '23505':
      throw new ConflictException(
        'Record already exists beacuse' + err?.constraint,
      );
    case '23503':
      throw new BadRequestException(
        'Referenced record does not exist' + err?.constraint,
      );
    case '23502':
      throw new BadRequestException(
        'Required field is missing' + err?.constraint,
      );
    case '23514':
      throw new BadRequestException(
        'Data does not satisfy a check constraint' + err?.constraint,
      );
    default:
      throw new DbException('Error occurred while storing the data');
  }
}
