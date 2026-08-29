import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema, UserSchemaDocument } from './schemas/user.schema';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaDocument.name, schema: userSchema },
    ]),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService],
})
export class UserModule {}
