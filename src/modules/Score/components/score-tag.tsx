import { Tag } from "@/components/tag";
import { useLocale } from "@/hooks/locale";
import { useScoreInfo } from "@/modules/Score/hooks/score";

interface Props {
  score: number;
}

export const ScoreTag: React.FC<Props> = (props) => {
  const { t } = useLocale("score.components.score-tag");
  const { scoreNumber } = useScoreInfo(props.score);

  return (
    <Tag color="purple">
      {scoreNumber} {t("points")}
    </Tag>
  );
};
