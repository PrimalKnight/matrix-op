import { useEffect, useMemo, useState } from 'react';

type MatrixGridProps = {
  matrix: number[][];
  isConfirmed: boolean;
  onMatrixChange: (matrix: number[][]) => void;
  onConfirm: () => void;
};

type CellErrorGrid = string[][];

const isValidNumberInput = (value: string): boolean => {
  if (value.trim() === '') {
    return false;
  }

  return /^-?(\d+\.?\d*|\.\d+)$/.test(value.trim());
};

export default function MatrixGrid({
  matrix,
  isConfirmed,
  onMatrixChange,
  onConfirm,
}: MatrixGridProps) {
  const size = matrix.length;

  const [inputGrid, setInputGrid] = useState<string[][]>(
    matrix.map((row) => row.map((value) => String(value))),
  );
  const [errors, setErrors] = useState<CellErrorGrid>(
    matrix.map((row) => row.map(() => '')),
  );

  useEffect(() => {
    setInputGrid(matrix.map((row) => row.map((value) => String(value))));
    setErrors(matrix.map((row) => row.map(() => '')));
  }, [matrix]);

  const hasErrors = useMemo(
    () => errors.some((row) => row.some((error) => error.length > 0)),
    [errors],
  );

  const handleCellChange = (rowIndex: number, colIndex: number, rawValue: string) => {
    const nextInputGrid = inputGrid.map((row, r) =>
      row.map((value, c) => {
        if (r === rowIndex && c === colIndex) {
          return rawValue;
        }

        return value;
      }),
    );
    setInputGrid(nextInputGrid);

    const nextErrors = errors.map((row, r) =>
      row.map((message, c) => {
        if (r !== rowIndex || c !== colIndex) {
          return message;
        }

        return isValidNumberInput(rawValue) ? '' : 'Enter a valid number';
      }),
    );
    setErrors(nextErrors);

    if (isValidNumberInput(rawValue)) {
      const parsed = Number(rawValue);
      const nextMatrix = matrix.map((row, r) =>
        row.map((value, c) => (r === rowIndex && c === colIndex ? parsed : value)),
      );
      onMatrixChange(nextMatrix);
    }
  };

  const handleConfirm = () => {
    const validationErrors = inputGrid.map((row) =>
      row.map((value) => (isValidNumberInput(value) ? '' : 'Enter a valid number')),
    );

    setErrors(validationErrors);

    const invalid = validationErrors.some((row) => row.some((error) => error.length > 0));
    if (invalid) {
      return;
    }

    onConfirm();
  };

  if (size === 0) {
    return null;
  }

  return (
    <div className="matrix-grid-wrap">
      <div
        className="matrix-grid"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(56px, 1fr))` }}
      >
        {inputGrid.map((row, rowIndex) =>
          row.map((value, colIndex) => {
            const message = errors[rowIndex][colIndex];
            return (
              <div className="cell" key={`${rowIndex}-${colIndex}`}>
                <input
                  aria-label={`matrix-${rowIndex}-${colIndex}`}
                  type="text"
                  inputMode="decimal"
                  value={value}
                  disabled={isConfirmed}
                  className={message ? 'invalid' : ''}
                  onChange={(event) => handleCellChange(rowIndex, colIndex, event.target.value)}
                />
                {message ? <small>{message}</small> : null}
              </div>
            );
          }),
        )}
      </div>

      <button type="button" onClick={handleConfirm} disabled={isConfirmed || hasErrors}>
        Confirm Matrix
      </button>
    </div>
  );
}
