/**
 * Remove all extra spaces from a string.
 * The "trim()" function is not enough to remove extra spaces like:
 * Hello   World.
 * @param str string
 * @returns string
 */
export function trimmed(str: string) {
  return str.replace(/\s{2,}/g, " ").trim();
}

/**
 * Remove dots, collons and etc
 * @param str string
 * @returns string
 */
export function clean(str: string) {
  return str.replace(/[.,;]/g, "");
}
