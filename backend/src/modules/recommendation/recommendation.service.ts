import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/config/prisma.service';
import { SkillRepository } from '../skills/skill.repository';
import { EmbeddingProviderPort } from '../skills/interfaces/embedding.provider';
import { RankedSkill } from './interfaces/recommendation-result.interface';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly skillRepository: SkillRepository,
    private readonly prisma: PrismaService,
    @Inject('EMBEDDING_PROVIDER')
    private readonly embeddingProvider: EmbeddingProviderPort,
  ) {}

  async recommend(message: string, workspaceId: string, sessionId: string): Promise<RankedSkill[]> {
    const messageEmbedding = await this.embeddingProvider.generateEmbedding(message);
    const skills = await this.skillRepository.findSkillsForRecommendation(workspaceId);

    const keywords = message.toLowerCase().split(/\W+/).filter(Boolean);

    const scored = await Promise.all(
      skills
        .filter((skill) => skill.embedding?.vector)
        .map(async (skill) => {
          const vector = skill.embedding?.vector as number[];
          const baseScore = this.cosineSimilarity(messageEmbedding, vector);

          const skillTags = (skill.tags as string[]) ?? [];
          const tagBoost = skillTags.some((tag) => keywords.includes(tag.toLowerCase())) ? 0.08 : 0;
          const categoryBoost = keywords.includes(skill.category.toLowerCase()) ? 0.05 : 0;

          const recentUsageCount = await this.prisma.skillUsageHistory.count({
            where: {
              workspaceId,
              skillId: skill.id,
              createdAt: { gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) },
            },
          });
          const recentUsageBoost = Math.min(0.07, recentUsageCount * 0.01);

          return {
            skillId: skill.id,
            name: skill.name,
            category: skill.category,
            tags: skillTags,
            rawScore: baseScore + tagBoost + categoryBoost + recentUsageBoost,
            boosts: { tagBoost, categoryBoost, recentUsageBoost },
          };
        }),
    );

    const ranked = scored
      .sort((a, b) => b.rawScore - a.rawScore)
      .slice(0, 5)
      .map((item, idx) => ({
        ...item,
        rank: idx + 1,
        confidence: Number(Math.min(1, item.rawScore).toFixed(4)),
      }));

    await this.prisma.recommendationLog.createMany({
      data: ranked.map((item) => ({
        workspaceId,
        sessionId,
        skillId: item.skillId,
        rank: item.rank,
        score: item.confidence,
        boostBreakdown: item.boosts,
        selected: item.rank === 1,
      })),
    });

    return ranked;
  }

  getRecommendations(sessionId: string) {
    return this.prisma.recommendationLog.findMany({
      where: { sessionId },
      orderBy: [{ createdAt: 'desc' }, { rank: 'asc' }],
      include: { skill: true },
    });
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (!a.length || !b.length || a.length !== b.length) return 0;
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < a.length; i += 1) {
      dot += a[i] * b[i];
      normA += a[i] ** 2;
      normB += b[i] ** 2;
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB) + Number.EPSILON);
  }
}
