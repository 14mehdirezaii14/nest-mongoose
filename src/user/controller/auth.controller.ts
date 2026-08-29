import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../dto/auth.dto';
import { MobilePipe } from 'src/shared/pipe/mobile.pipe';
import { PasswordPipe } from 'src/shared/pipe/password.pipe';
import { UserService } from '../service/user.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}
  @Post('sign-in')
  async signIn(@Body(MobilePipe, new PasswordPipe(false)) body: AuthDto) {
    return await this.userService.signIn(body);
  }
}
