import { Module } from '@nestjs/common';
import { InMemoryQueueService } from './in-memory-queue.service';

@Module({
  providers: [{ provide: 'QUEUE_PORT', useClass: InMemoryQueueService }],
  exports: ['QUEUE_PORT'],
})
export class QueueModule {}
