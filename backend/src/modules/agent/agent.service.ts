import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/config/prisma.service';
import { RecommendationService } from '../recommendation/recommendation.service';
import { AgentMessageDto } from './dto/agent-message.dto';
import { AgentResponse } from './interfaces/agent-response.interface';

@Injectable()
export class AgentService {
  constructor(
    private readonly recommendationService: RecommendationService,
    private readonly prisma: PrismaService,
  ) {}

  async processMessage(dto: AgentMessageDto): Promise<AgentResponse> {
    const session = dto.sessionId
      ? await this.prisma.agentSession.update({
          where: { id: dto.sessionId },
          data: { lastMessageAt: new Date() },
        })
      : await this.prisma.agentSession.create({
          data: {
            workspaceId: dto.workspaceId,
            userId: dto.userId,
            title: dto.message.slice(0, 48),
            lastMessageAt: new Date(),
          },
        });

    const recommendations = await this.recommendationService.recommend(
      dto.message,
      dto.workspaceId,
      session.id,
    );

    const selectedSkillId = dto.selectedSkillId ?? recommendations[0]?.skillId;

    const skill = selectedSkillId
      ? await this.prisma.skill.findUnique({ where: { id: selectedSkillId } })
      : null;

    const output = this.simulateLlmExecution(dto.message, skill?.systemPrompt ?? '');

    if (selectedSkillId) {
      await this.prisma.skillUsageHistory.create({
        data: {
          workspaceId: dto.workspaceId,
          userId: dto.userId,
          sessionId: session.id,
          skillId: selectedSkillId,
          userMessage: dto.message,
          response: JSON.stringify(output),
          confidence: recommendations.find((item) => item.skillId === selectedSkillId)?.confidence ?? 0,
        },
      });
    }

    return {
      sessionId: session.id,
      selectedSkillId: selectedSkillId ?? '',
      output,
      recommendations,
    };
  }

  private simulateLlmExecution(message: string, systemPrompt: string) {
    return {
      summary: `Simulated execution for: ${message}`,
      actions: ['analyze', 'plan', 'respond'],
      structured: {
        systemPromptExcerpt: systemPrompt.slice(0, 140),
        intent: message.split(' ')[0]?.toLowerCase() ?? 'general',
      },
    };
  }
}
