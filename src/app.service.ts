import { Body, Injectable } from '@nestjs/common';
import { LogSchema } from './shared/schemas/log.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogDto } from './shared/dtos/log.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(LogSchema.name)
    private readonly logModel: Model<LogSchema>,
  ) {}

  async log(@Body() body: LogDto) {
    const newLog = new this.logModel(body);

    await newLog.save();

    return newLog;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
