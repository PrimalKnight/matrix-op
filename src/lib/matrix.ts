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

export const moveIndex = (indices: number[], from: number, to: number): number[] => {
  const next = [...indices];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
};

export const permuteRows = (matrix: Matrix, permutation: number[]): Matrix =>
  permutation.map((sourceRow) => [...matrix[sourceRow]]);

export const permuteCols = (matrix: Matrix, permutation: number[]): Matrix =>
  matrix.map((row) => permutation.map((sourceCol) => row[sourceCol]));
