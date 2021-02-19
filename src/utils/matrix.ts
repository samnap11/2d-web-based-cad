export const multiplyMatrix = (matA: number[], matB: number[]): number[] => {
  const result: number[] = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let tmp = 0;

      for (let k = 0; k < 3; k++) {
        tmp += matA[i * 3 + k] * matB[k * 3 + j];
      }

      result.push(tmp);
    }
  }

  return result;
};

export const addMatrix = (matA: number[], matB: number[]): number[] => {
  const result: number[] = [];

  for (let i = 0; i < matA.length; i++) {
    result.push(matA[i] + matB[i]);
  }

  return result;
};
