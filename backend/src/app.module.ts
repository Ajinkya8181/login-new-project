import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ajinkyakhedekar8181:wmq2bKxwl3uQ96pu@test-pro-db.r7qy6ul.mongodb.net/?retryWrites=true&w=majority&appName=test-pro-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any),
    UsersModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
