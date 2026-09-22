import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { SeoService } from '../services/seo.service';
import { SeoDto } from '../dtos/seo.dto';
import { SeoUpdateDto } from '../dtos/seo-update.dto';
import { SeoQueryDto } from '../dtos/seo-query.dto';
import { Role } from 'src/user/schemas/user.schema';
import { RoleGuard } from 'src/shared/guard/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/shared/guard/jwt.guard';

@Controller('seo')
@UseGuards(JwtGuard, new RoleGuard([Role.Admin, Role.CopyRighter]))
@ApiBearerAuth()
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Post()
  async create(@Body() createDto: SeoDto) {
    return this.seoService.create(createDto);
  }

  @Get()
  async findAll(@Query() queryDto: SeoQueryDto) {
    return this.seoService.findAll(queryDto);
  }

  @Get('by-url')
  async findByUrl(@Query('url') url: string) {
    return this.seoService.findByUrl(url);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: SeoUpdateDto) {
    return this.seoService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return this.seoService.remove(id);
  }
}
