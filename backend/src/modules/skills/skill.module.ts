import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { SkillRepository } from './skill.repository';
import { MockEmbeddingProvider } from './mock-embedding.provider';

@Module({
  providers: [
    SkillService,
    SkillRepository,
    MockEmbeddingProvider,
    { provide: 'EMBEDDING_PROVIDER', useExisting: MockEmbeddingProvider },
  ],
  controllers: [SkillController],
  exports: [SkillService, SkillRepository, 'EMBEDDING_PROVIDER'],
})
export class SkillModule {}
