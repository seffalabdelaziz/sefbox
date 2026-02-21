import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from './common/config/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { SkillModule } from './modules/skills/skill.module';
import { RecommendationModule } from './modules/recommendation/recommendation.module';
import { AgentModule } from './modules/agent/agent.module';
import { CacheModule } from './common/cache/cache.module';
import { QueueModule } from './common/queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    CacheModule,
    QueueModule,
    AuthModule,
    SkillModule,
    RecommendationModule,
    AgentModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
