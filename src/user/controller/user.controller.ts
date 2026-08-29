import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { UserQueryDto } from '../dto/user-query.dto';
import { FarsiPipe } from 'src/shared/pipe/farsi.pipe';
import { MobilePipe } from 'src/shared/pipe/mobile.pipe';
import { PasswordPipe } from 'src/shared/pipe/password.pipe';
import { PasswordInterceptor } from 'src/shared/interceptors/password.interceptor';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtGuard } from 'src/shared/guard/jwt.guard';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  findAll(@Query() queryParams: UserQueryDto) {
    return this.userService.findAll(queryParams);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOn(id);
  }

  @Patch('/:id')
  @UseInterceptors(PasswordInterceptor)
  edit(
    @Param('id') id: string,
    @Body(FarsiPipe, MobilePipe, new PasswordPipe(true)) body: UpdateUserDto,
  ) {
    return this.userService.edit(id, body);
  }

  @Post()
  @UseInterceptors(PasswordInterceptor)
  create(@Body(FarsiPipe, MobilePipe, new PasswordPipe(true)) body: UserDto) {
    return this.userService.create(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
