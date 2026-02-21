import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as crypto from 'node:crypto';
import matter from 'gray-matter';
import { SkillRepository } from './skill.repository';
import { EmbeddingProviderPort } from './interfaces/embedding.provider';
import { ListSkillsDto } from './dto/list-skills.dto';

@Injectable()
export class SkillService {
  constructor(
    private readonly skillRepository: SkillRepository,
    @Inject('EMBEDDING_PROVIDER')
    private readonly embeddingProvider: EmbeddingProviderPort,
  ) {}

  async importSkills(workspaceId: string, skillsDir = path.resolve('skills')) {
    const files = await fs.readdir(skillsDir);
    const mdFiles = files.filter((file) => file.endsWith('.md'));

    for (const file of mdFiles) {
      const absolutePath = path.join(skillsDir, file);
      const raw = await fs.readFile(absolutePath, 'utf-8');
      const parsed = matter(raw);
      const checksum = crypto.createHash('sha256').update(raw).digest('hex');
      const embeddingInput = `${parsed.data.name ?? file}\n${parsed.data.description ?? ''}\n${parsed.content}`;
      const embedding = await this.embeddingProvider.generateEmbedding(embeddingInput);

      await this.skillRepository.upsertSkill({
        workspaceId,
        name: parsed.data.name ?? file.replace('.md', ''),
        slug: (parsed.data.name ?? file.replace('.md', '')).toLowerCase().replace(/\s+/g, '-'),
        description: parsed.data.description ?? '',
        tags: parsed.data.tags ?? [],
        category: parsed.data.category ?? 'general',
        inputSchema: parsed.data.inputSchema ?? {},
        outputSchema: parsed.data.outputSchema ?? {},
        exampleUsage: parsed.data.exampleUsage,
        systemPrompt: parsed.data.systemPrompt ?? parsed.content,
        sourceFilePath: absolutePath,
        checksum,
        embedding,
      });
    }

    return { imported: mdFiles.length };
  }

  listSkills(dto: ListSkillsDto) {
    return this.skillRepository.listSkills(dto.workspaceId, dto.category);
  }
}
