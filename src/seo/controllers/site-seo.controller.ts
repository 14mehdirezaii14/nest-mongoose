import { Controller, Get, Query } from '@nestjs/common';
import { SeoService } from '../services/seo.service';
import { SeoQueryDto } from '../dtos/seo-query.dto';
import { UrlPipe } from 'src/shared/pipe/url.pipe';

@Controller('site-seo')
export class SiteSeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get('find-by-url')
  findByUrl(@Query(UrlPipe) queryParams: SeoQueryDto) {
    return this.seoService.findByUrl(queryParams.url!);
  }
}
