import { IsOptional, IsString } from 'class-validator';

export class ListSkillsDto {
  @IsString()
  workspaceId!: string;

  @IsOptional()
  @IsString()
  category?: string;
}
