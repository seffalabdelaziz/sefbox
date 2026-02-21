import { IsString } from 'class-validator';

export class RecommendDto {
  @IsString()
  workspaceId!: string;

  @IsString()
  message!: string;

  @IsString()
  sessionId!: string;
}
