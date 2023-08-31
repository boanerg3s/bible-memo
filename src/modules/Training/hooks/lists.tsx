import { useLocale } from "@/hooks/locale";
import { AppStyles } from "@/styles";
import { Bold, BookOpen, Grid } from "react-native-feather";
type TrainingList = Record<App.Training, { title: string; description: string; icon?: React.ReactElement }>;

const DEFAULT_TRAINING_LIST: TrainingList = {
  READING: { title: "", description: "" },
  FRAGMENTS: { title: "", description: "" },
  FIRST_LETTER: { title: "", description: "" },
};

const ICONS: Record<App.Training, React.ReactElement> = {
  READING: <BookOpen width={16} height={16} stroke={AppStyles.color.black} strokeWidth={3} />,
  FRAGMENTS: <Grid width={16} height={16} stroke={AppStyles.color.black} strokeWidth={3} />,
  FIRST_LETTER: <Bold width={16} height={16} stroke={AppStyles.color.black} strokeWidth={3} />,
};

export const useTrainingList = (): TrainingList => {
  const { t } = useLocale("training");
  const trainingList = Object.keys(DEFAULT_TRAINING_LIST) as App.Training[];

  return trainingList.reduce<TrainingList>((obj, training) => {
    return {
      ...obj,
      [training]: {
        icon: ICONS[training],
        title: t(`title.${training}`),
        description: t(`description.${training}`),
      },
    };
  }, DEFAULT_TRAINING_LIST);
};
