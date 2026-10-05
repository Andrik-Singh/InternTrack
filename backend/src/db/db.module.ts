import { Global, Module } from '@nestjs/common';
import { DrizzleModule } from '@nestjs/drizzle';
import { drizzle } from 'drizzle-orm/neon-http';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    DrizzleModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        drizzle,
        connection: config.getOrThrow<'string'>('DATABASE_URL'),
      }),
    }),
  ],
  exports: [DbModule],
})
export class DbModule {}
