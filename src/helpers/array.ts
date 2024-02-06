export function makeArrayUnique<T>(values: T[]): T[] {
  return values.reduce((unique, value) => {
    if (unique.includes(value)) return unique;
    return [...unique, value];
  }, [] as T[]);
}

export function removeFromArray<T>(values: T[], toRemove: T): T[] {
  const filtered = values.filter((value) => value !== toRemove);
  return makeArrayUnique(filtered);
}
