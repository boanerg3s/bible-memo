import unidecode from "unidecode";
import compare from "string-comparison";
import { clean, trimmed } from "@/helpers/string";

/**
 * Given a bible passage, check if users input matches it
 * @param given string
 * @param expected string
 * @returns a match percentage (eg: 90%)
 */
export const evaluateBiblePassage = (given: string, expected: string) => {
  const normalizers = [(str: string) => str.toLowerCase(), unidecode, trimmed, clean];
  const normalizedA = normalizers.reduce((normalized, normalizer) => normalizer(normalized), given);
  const normalizedB = normalizers.reduce((normalized, normalizer) => normalizer(normalized), expected);

  const similarityRatio = compare.levenshtein.similarity(normalizedA, normalizedB);
  return Math.ceil(similarityRatio * 100);
};
