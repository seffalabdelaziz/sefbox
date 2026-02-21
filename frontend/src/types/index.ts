export interface SkillRecommendation {
  skillId: string;
  name: string;
  confidence: number;
  rank: number;
  category: string;
}

export interface AgentMessageResponse {
  sessionId: string;
  selectedSkillId: string;
  recommendations: SkillRecommendation[];
  output: {
    summary: string;
    actions: string[];
    structured: Record<string, unknown>;
  };
}
