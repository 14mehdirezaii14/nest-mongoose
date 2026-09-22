import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seo } from '../schemas/seo.schema';
import { SeoDto } from '../dtos/seo.dto';
import { SeoQueryDto } from '../dtos/seo-query.dto';
import { SeoUpdateDto } from '../dtos/seo-update.dto';

@Injectable()
export class SeoService {
  constructor(
    @InjectModel(Seo.name)
    private readonly seoModel: Model<Seo>,
  ) {}

  async create(createDto: SeoDto): Promise<Seo> {
    const existing = await this.seoModel.findOne({ url: createDto.url }).lean();
    if (existing) {
      throw new ConflictException(
        `رکورد سئو برای آدرس '${createDto.url}' از قبل وجود دارد.`,
      );
    }

    const createdSeo = new this.seoModel(createDto);
    return await createdSeo.save();
  }

  async findAll(queryDto: SeoQueryDto) {
    const { page = 1, limit = 10, url } = queryDto;
    const filter: Record<string, any> = {};

    if (url) {
      filter.url = { $regex: url, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.seoModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 })
        .exec(),
      this.seoModel.countDocuments(filter).exec(),
    ]);

    return {
      items,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<Seo> {
    const seo = await this.seoModel.findById(id).exec();
    if (!seo) {
      throw new NotFoundException(`اطلاعات سئو با شناسه '${id}' یافت نشد.`);
    }
    return seo;
  }

  async findByUrl(url: string): Promise<Seo> {
    const seo = await this.seoModel.findOne({ url }).exec();
    if (!seo) {
      throw new NotFoundException(`اطلاعات سئو برای آدرس '${url}' یافت نشد.`);
    }
    return seo;
  }

  async update(id: string, updateDto: SeoUpdateDto): Promise<Seo> {
    if (updateDto.url) {
      const existing = await this.seoModel
        .findOne({
          url: updateDto.url,
          _id: { $ne: id },
        })
        .lean();

      if (existing) {
        throw new ConflictException(
          `آدرس '${updateDto.url}' توسط رکورد دیگری استفاده شده است.`,
        );
      }
    }

    const updated = await this.seoModel
      .findByIdAndUpdate(id, { $set: updateDto }, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`اطلاعات سئو با شناسه '${id}' یافت نشد.`);
    }

    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.seoModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`اطلاعات سئو با شناسه '${id}' یافت نشد.`);
    }
    return { message: 'رکورد سئو با موفقیت حذف شد.' };
  }
}
