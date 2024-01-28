import { Injectable } from '@nestjs/common';
import { PrismaClient, Task } from '@prisma/client';
import { CreateTaskDTO, UpdateTaskDTO } from './task.dto/task.dto';

const prisma = new PrismaClient()

@Injectable()
export class TaskService {

  async getAll(): Promise<Task[]> {
    return prisma.task.findMany()
  }

  async getOne(taskId: string): Promise<Task> {
    return prisma.task.findUnique({ where: { id: taskId } })
  }

  async create(newTaskData: CreateTaskDTO): Promise<Task> {
    return prisma.task.create({ data: { ...newTaskData } })
  }

  async deleteOne(taskId: string): Promise<Task> {
    return prisma.task.delete({ where: { id: taskId } })
  }

  async updateOne(updateTaskData: UpdateTaskDTO): Promise<Task> {
    return prisma.task
      .update({ where: { id: updateTaskData.id }, data: { ...updateTaskData } })
  }
}
