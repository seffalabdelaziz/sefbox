import { RankedSkill } from 'src/modules/recommendation/interfaces/recommendation-result.interface';

export interface AgentResponse {
  sessionId: string;
  selectedSkillId: string;
  output: {
    summary: string;
    actions: string[];
    structured: Record<string, unknown>;
  };
  recommendations: RankedSkill[];
}
