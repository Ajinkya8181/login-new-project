import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string): Promise<User> {
    const user = new this.userModel({ username, password });
    return user.save();
  }

  async validateUser(username: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ username });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { username: user.username, sub: user._id };
    return this.jwtService.sign(payload);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateUser(id: string, username: string): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, { username }, { new: true }).exec();
    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('User not found');
  }
}
