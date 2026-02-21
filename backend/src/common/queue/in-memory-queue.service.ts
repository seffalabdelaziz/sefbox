import { Injectable } from '@nestjs/common';
import { QueuePort } from './queue.interface';

@Injectable()
export class InMemoryQueueService implements QueuePort {
  async enqueue<T>(name: string, payload: T): Promise<void> {
    console.log(`[queue:${name}]`, payload);
  }
}
