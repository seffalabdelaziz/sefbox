import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { RecommendationModule } from '../recommendation/recommendation.module';

@Module({
  imports: [RecommendationModule],
  providers: [AgentService],
  controllers: [AgentController],
})
export class AgentModule {}
