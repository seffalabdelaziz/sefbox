import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller({ path: 'recommendations', version: '1' })
@UseGuards(JwtAuthGuard)
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get(':sessionId')
  getBySession(@Param('sessionId') sessionId: string) {
    return this.recommendationService.getRecommendations(sessionId);
  }
}
