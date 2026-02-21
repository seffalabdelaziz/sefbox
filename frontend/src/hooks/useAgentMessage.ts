import { useMutation } from '@tanstack/react-query';
import { agentService } from '../services/agent.service';

export const useAgentMessage = () =>
  useMutation({
    mutationFn: agentService.sendMessage,
  });
