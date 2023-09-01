export const pickRandomNumbers = (max: number) => {
  const oneThird = Math.ceil(max / 3);
  const randomNumbers: number[] = [];

  while (randomNumbers.length < oneThird) {
    const randomNumber = Math.floor(Math.random() * max) + 1;
    if (!randomNumbers.includes(randomNumber)) randomNumbers.push(randomNumber);
  }

  return randomNumbers;
};
