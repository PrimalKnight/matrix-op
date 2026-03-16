import { Matrix, cloneMatrix } from './matrix';

export const createIdentityMatrix = (size: number): Matrix =>
  Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => (row === col ? 1 : 0)),
  );

export const applyRowSwapToPair = (
  matrix: Matrix,
  identity: Matrix,
  from: number,
  to: number,
): { matrix: Matrix; identity: Matrix } => {
  const nextMatrix = cloneMatrix(matrix);
  const nextIdentity = cloneMatrix(identity);

  [nextMatrix[from], nextMatrix[to]] = [nextMatrix[to], nextMatrix[from]];
  [nextIdentity[from], nextIdentity[to]] = [nextIdentity[to], nextIdentity[from]];

  return { matrix: nextMatrix, identity: nextIdentity };
};

export const applyColSwapToPair = (
  matrix: Matrix,
  identity: Matrix,
  from: number,
  to: number,
): { matrix: Matrix; identity: Matrix } => {
  const nextMatrix = cloneMatrix(matrix);
  const nextIdentity = cloneMatrix(identity);

  for (let row = 0; row < nextMatrix.length; row += 1) {
    [nextMatrix[row][from], nextMatrix[row][to]] = [nextMatrix[row][to], nextMatrix[row][from]];
    [nextIdentity[row][from], nextIdentity[row][to]] = [nextIdentity[row][to], nextIdentity[row][from]];
  }

  return { matrix: nextMatrix, identity: nextIdentity };
};
