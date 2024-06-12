import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(title: string, description: string, userId: string): Promise<Task> {
    const newTask = new this.taskModel({ title, description, userId });
    return newTask.save();
  }

  async getTasks(userId: string): Promise<Task[]> {
    return this.taskModel.find({ userId }).exec();
  }

  async updateTask(id: string, title: string, description: string): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, { title, description }, { new: true }).exec();
    if (!updatedTask) throw new NotFoundException('Task not found');
    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Task not found');
  }
}
