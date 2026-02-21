export interface RankedSkill {
  skillId: string;
  name: string;
  confidence: number;
  rank: number;
  category: string;
  tags: string[];
  boosts: {
    tagBoost: number;
    categoryBoost: number;
    recentUsageBoost: number;
  };
}
