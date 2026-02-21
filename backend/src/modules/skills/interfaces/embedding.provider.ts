export interface EmbeddingProviderPort {
  generateEmbedding(input: string): Promise<number[]>;
}
