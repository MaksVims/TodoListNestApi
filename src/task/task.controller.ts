import {
  Controller,
  HttpStatus,
  Get,
  Body,
  Post,
  Param,
  ParseUUIDPipe,
  Delete,
  Patch
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';
import { CreateTaskDTO, UpdateTaskDTO } from './task.dto/task.dto';
import { callError } from 'src/helpers';
import { ERROR_MESSAGE } from 'src/const';


@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  async getAll(): Promise<Task[]> {
    try {
      const tasks = await this.taskService.getAll()
      return tasks
    } catch (error) {
      callError(HttpStatus.INTERNAL_SERVER_ERROR, ERROR_MESSAGE.SERVER_ERR)
    }
  }

  @Get(':id')
  async getOne(@Param('id', ParseUUIDPipe) taskId: string): Promise<Task> {
    try {
      const currentTask = await this.taskService.getOne(taskId)

      if (!currentTask) {
        callError(HttpStatus.NOT_FOUND, ERROR_MESSAGE.TASK_NOT_FOUND)
      }

      return currentTask
    } catch (error) {
      callError(error.status, error.cause)
    }
  }


  @Post()
  async create(@Body() data: CreateTaskDTO): Promise<Task> {
    try {
      const createdTask = this.taskService.create({ ...data })
      return createdTask
    } catch (error) {
      callError(HttpStatus.INTERNAL_SERVER_ERROR, ERROR_MESSAGE.SERVER_ERR)
    }
  }


  @Delete(':id')
  async deleteOne(@Param('id', ParseUUIDPipe) taskId: string): Promise<Task> {
    try {
      const deletedTask = await this.taskService.deleteOne(taskId)
      return deletedTask
    } catch (error) {
      callError(HttpStatus.NOT_FOUND, ERROR_MESSAGE.TASK_NOT_FOUND)
    }
  }


  @Patch()
  async updateOne(@Body() data: UpdateTaskDTO): Promise<Task> {
    try {
      await this.taskService.getOne(data.id)

      const updatedTask = await this.taskService.updateOne(data)
      return updatedTask
    } catch (error) {
      callError(HttpStatus.NOT_FOUND, ERROR_MESSAGE.TASK_NOT_FOUND)
    }
  }
}
