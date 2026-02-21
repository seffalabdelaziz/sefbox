import { create } from 'zustand';
import { SkillRecommendation } from '../types';

interface AgentState {
  sessionId?: string;
  recommendations: SkillRecommendation[];
  selectedSkillId?: string;
  setSessionId: (id: string) => void;
  setRecommendations: (items: SkillRecommendation[]) => void;
  setSelectedSkillId: (id: string) => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  recommendations: [],
  setSessionId: (sessionId) => set({ sessionId }),
  setRecommendations: (recommendations) => set({ recommendations }),
  setSelectedSkillId: (selectedSkillId) => set({ selectedSkillId }),
}));
