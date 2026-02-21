import { Injectable } from '@nestjs/common';
import { EmbeddingProviderPort } from './interfaces/embedding.provider';

@Injectable()
export class MockEmbeddingProvider implements EmbeddingProviderPort {
  async generateEmbedding(input: string): Promise<number[]> {
    const arr = new Array(32).fill(0).map((_, i) => {
      const code = input.charCodeAt(i % Math.max(1, input.length)) ?? 0;
      return ((code + i * 31) % 100) / 100;
    });
    return arr;
  }
}
