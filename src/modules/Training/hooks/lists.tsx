import { useLocale } from "@/hooks/locale";
import { AppStyles } from "@/styles";
import { Bold, BookOpen, Grid, Headphones } from "react-native-feather";
import { scale, verticalScale } from "react-native-size-matters";
type TrainingList = Record<App.Training, { title: string; description: string; icon?: React.ReactElement }>;

const DEFAULT_TRAINING_LIST: TrainingList = {
  READING: { title: "", description: "" },
  DICTATION: { title: "", description: "" },
  FIRST_LETTER: { title: "", description: "" },
  FRAGMENTS: { title: "", description: "" },
};

const ICONS: Record<App.Training, React.ReactElement> = {
  READING: (
    <BookOpen width={scale(16)} height={verticalScale(16)} stroke={AppStyles.color.black} strokeWidth={scale(3)} />
  ),
  DICTATION: (
    <Headphones width={scale(16)} height={verticalScale(16)} stroke={AppStyles.color.black} strokeWidth={scale(3)} />
  ),
  FIRST_LETTER: (
    <Bold width={scale(16)} height={verticalScale(16)} stroke={AppStyles.color.black} strokeWidth={scale(3)} />
  ),
  FRAGMENTS: (
    <Grid width={scale(16)} height={verticalScale(16)} stroke={AppStyles.color.black} strokeWidth={scale(3)} />
  ),
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
