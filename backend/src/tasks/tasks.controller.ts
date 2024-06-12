import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../users/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() body: { title: string; description: string }, @Request() req) {
    return this.tasksService.createTask(body.title, body.description, req.user.userId);
  }

  @Get()
  async getTasks(@Request() req) {
    return this.tasksService.getTasks(req.user.userId);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() body: { title: string; description: string }) {
    return this.tasksService.updateTask(id, body.title, body.description);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
