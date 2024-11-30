import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './domain/auth/auth.module';
import { FileModule } from './domain/files/file.module';
import { PostModule } from './domain/posts/post.module';
import { LibraryModule } from './libs/library.module';
import { RepositoryModule } from './repository/repository.module';
import { LoggerMiddleware } from './share/middlewares/logger.middleware';

console.log(process.env.MONGODB_URL);

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configSrv: ConfigService) => ({
        uri: configSrv.get('MONGODB_URL'),
        onConnectionCreate: (connection: Connection) => {
          connection.set(
            'debug',
            (
              collectionName: string,
              method: string,
              query: object,
              doc: object,
            ) => {
              console.log(
                `Mongoose Query - Collection: ${collectionName}, Method: ${method}, Query: ${JSON.stringify(query)}, Doc: ${JSON.stringify(doc)}`,
              );
            },
          );

          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({
      secret: 'no-secret',
      signOptions: { expiresIn: '60s' },
    }),
    RepositoryModule,
    LibraryModule,
    FileModule,
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
