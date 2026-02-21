import { IsOptional, IsString } from 'class-validator';

export class AgentMessageDto {
  @IsString()
  workspaceId!: string;

  @IsString()
  userId!: string;

  @IsString()
  message!: string;

  @IsOptional()
  @IsString()
  sessionId?: string;

  @IsOptional()
  @IsString()
  selectedSkillId?: string;
}
