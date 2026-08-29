import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchemaDocument } from '../schemas/user.schema';
import { Model, QueryFilter } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import { sortUtils } from 'src/shared/utils/sort/sort-utils';
import { UserQueryDto } from '../dto/user-query.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthDto } from '../dto/auth.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(UserSchemaDocument.name)
    private readonly userModel: Model<UserSchemaDocument>,
  ) {}

  async findAll(queryParams: UserQueryDto) {
    const {
      page = 1,
      limit = 10,
      name,
      lastName,
      search,
      mobile,
    } = queryParams;
    const skip = (page - 1) * limit;

    const sort = sortUtils(queryParams);

    const filter: QueryFilter<UserSchemaDocument> = {};

    if (name) {
      filter.$or = [{ name: { $regex: name, $options: 'i' } }];
    }

    if (lastName) {
      filter.$or = [{ lastName: { $regex: lastName, $options: 'i' } }];
    }

    if (mobile) {
      filter.$or = [{ mobile: { $regex: mobile, $options: 'i' } }];
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.userModel.find(filter).skip(skip).limit(limit).sort(sort).exec(),
      this.userModel.countDocuments().exec(),
    ]);

    return { data, total };
  }

  async findOn(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();

    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  async edit(id: string, body: UpdateUserDto) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`آیتمی با آیدی ${id} برای آپدیت یافت نشد`);
    }

    const newBlog = await this.userModel
      .findByIdAndUpdate(id, body, {
        returnDocument: 'after',
      })
      .exec();

    return newBlog;
  }

  async create(body: UserDto) {
    const newUser = new this.userModel(body);

    await newUser.save();

    return newUser;
  }

  async delete(id: string) {
    const blog = await this.userModel.findByIdAndDelete(id);
    return blog;
  }

  async findOneMobile(mobile: string) {
    const user = await this.userModel.findOne({ mobile });

    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  async signIn(@Body() body: AuthDto) {
    const { mobile, password } = body;
    const user = await this.findOneMobile(mobile);

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      throw new BadRequestException('incorrect password');
    }
    const payload = { _id: user._id };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
