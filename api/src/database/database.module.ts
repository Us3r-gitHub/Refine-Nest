import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST') || 'localhost',
        port: +configService.get('DB_PORT') || 5432,
        username: configService.get('DB_USER') || 'postgres',
        password: configService.get('DB_PASSWORD') || 'postgres',
        database: configService.get('DB_DATABASE') || 'postgres',

        autoLoadEntities: true,
        logging: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}