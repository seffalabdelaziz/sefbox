import { SkillRecommendation } from '../types';

interface Props {
  recommendations: SkillRecommendation[];
  onSelect: (skillId: string) => void;
}

export function RecommendedSkillsSidebar({ recommendations, onSelect }: Props) {
  return (
    <aside>
      <h3>Recommended skills</h3>
      {recommendations.map((rec) => (
        <button key={rec.skillId} onClick={() => onSelect(rec.skillId)}>
          {rec.name} - {(rec.confidence * 100).toFixed(1)}%
        </button>
      ))}
    </aside>
  );
}
