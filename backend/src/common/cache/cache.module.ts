import { Module } from '@nestjs/common';
import { InMemoryCacheService } from './in-memory-cache.service';

@Module({
  providers: [{ provide: 'CACHE_PORT', useClass: InMemoryCacheService }],
  exports: ['CACHE_PORT'],
})
export class CacheModule {}
