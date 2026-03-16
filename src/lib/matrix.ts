export type Matrix = number[][];

export const cloneMatrix = (matrix: Matrix): Matrix => matrix.map((row) => [...row]);

export const createZeroMatrix = (size: number): Matrix =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => 0));

export const swapRows = (matrix: Matrix, a: number, b: number): Matrix => {
  const next = cloneMatrix(matrix);
  [next[a], next[b]] = [next[b], next[a]];
  return next;
};

export const swapCols = (matrix: Matrix, a: number, b: number): Matrix => {
  const next = cloneMatrix(matrix);
  for (let row = 0; row < next.length; row += 1) {
    [next[row][a], next[row][b]] = [next[row][b], next[row][a]];
  }
  return next;
};

export const setCell = (matrix: Matrix, row: number, col: number, value: number): Matrix => {
  const next = cloneMatrix(matrix);
  next[row][col] = value;
  return next;
};
