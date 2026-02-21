import { ChatWindow } from '../components/ChatWindow';
import { RecommendedSkillsSidebar } from '../components/RecommendedSkillsSidebar';
import { useAgentStore } from '../store/agent.store';
import { useAgentMessage } from '../hooks/useAgentMessage';

export function AgentChatPage() {
  const { recommendations, setRecommendations, selectedSkillId, setSelectedSkillId, sessionId, setSessionId } =
    useAgentStore();
  const mutation = useAgentMessage();

  const sendMessage = async (message: string) => {
    const response = await mutation.mutateAsync({
      workspaceId: 'demo-workspace',
      userId: 'demo-user',
      message,
      sessionId,
      selectedSkillId,
    });
    setSessionId(response.data.sessionId);
    setRecommendations(response.data.recommendations);
  };

  return (
    <div>
      <RecommendedSkillsSidebar recommendations={recommendations} onSelect={setSelectedSkillId} />
      <ChatWindow onSend={sendMessage} />
    </div>
  );
}
