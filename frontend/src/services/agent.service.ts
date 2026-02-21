import { api } from './api';

export const agentService = {
  sendMessage: (payload: {
    workspaceId: string;
    userId: string;
    message: string;
    sessionId?: string;
    selectedSkillId?: string;
  }) => api.post('/agent/message', payload),
  recommendations: (sessionId: string) => api.get(`/recommendations/${sessionId}`),
  skills: (workspaceId: string) => api.get('/skills', { params: { workspaceId } }),
};
