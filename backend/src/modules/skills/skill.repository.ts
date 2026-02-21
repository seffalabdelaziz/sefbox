import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/config/prisma.service';

@Injectable()
export class SkillRepository {
  constructor(private readonly prisma: PrismaService) {}

  upsertSkill(data: {
    workspaceId: string;
    name: string;
    slug: string;
    description: string;
    tags: unknown;
    category: string;
    inputSchema: unknown;
    outputSchema: unknown;
    exampleUsage?: string;
    systemPrompt: string;
    sourceFilePath: string;
    checksum: string;
    embedding: number[];
  }) {
    return this.prisma.skill.upsert({
      where: {
        workspaceId_slug: { workspaceId: data.workspaceId, slug: data.slug },
      },
      create: {
        workspaceId: data.workspaceId,
        name: data.name,
        slug: data.slug,
        description: data.description,
        tags: data.tags as Prisma.JsonValue,
        category: data.category,
        inputSchema: data.inputSchema as Prisma.JsonValue,
        outputSchema: data.outputSchema as Prisma.JsonValue,
        exampleUsage: data.exampleUsage,
        systemPrompt: data.systemPrompt,
        sourceFilePath: data.sourceFilePath,
        checksum: data.checksum,
        embedding: {
          create: {
            workspaceId: data.workspaceId,
            vector: data.embedding,
            model: 'mock-v1',
            dimensions: data.embedding.length,
          },
        },
      },
      update: {
        name: data.name,
        description: data.description,
        tags: data.tags as Prisma.JsonValue,
        category: data.category,
        inputSchema: data.inputSchema as Prisma.JsonValue,
        outputSchema: data.outputSchema as Prisma.JsonValue,
        exampleUsage: data.exampleUsage,
        systemPrompt: data.systemPrompt,
        sourceFilePath: data.sourceFilePath,
        checksum: data.checksum,
        embedding: {
          upsert: {
            create: {
              workspaceId: data.workspaceId,
              vector: data.embedding,
              model: 'mock-v1',
              dimensions: data.embedding.length,
            },
            update: {
              vector: data.embedding,
              model: 'mock-v1',
              dimensions: data.embedding.length,
            },
          },
        },
      },
    });
  }

  listSkills(workspaceId: string, category?: string) {
    return this.prisma.skill.findMany({
      where: { workspaceId, ...(category ? { category } : {}) },
      orderBy: { updatedAt: 'desc' },
      include: { embedding: true },
    });
  }

  findSkillsForRecommendation(workspaceId: string) {
    return this.prisma.skill.findMany({
      where: { workspaceId, isActive: true },
      include: { embedding: true },
    });
  }
}
