import abbreviate from "number-abbreviate";

export const useScoreInfo = (score: number) => {
  return { scoreNumber: abbreviate(score, 2) };
};
