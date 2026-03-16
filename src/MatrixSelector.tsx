import { useState, type ChangeEvent } from 'react';

type MatrixSelectorProps = {
  onMatrixChange: (matrix: number[][]) => void;
};

const MATRIX_SIZES = [2, 3, 4, 5];

const createMatrix = (size: number): number[][] =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => 0));

export default function MatrixSelector({ onMatrixChange }: MatrixSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<number>(2);

  const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextSize = Number(event.target.value);
    setSelectedSize(nextSize);
    onMatrixChange(createMatrix(nextSize));
  };

  return (
    <div className="matrix-selector">
      <label htmlFor="matrix-size">Matrix size</label>
      <select id="matrix-size" value={selectedSize} onChange={handleSizeChange}>
        {MATRIX_SIZES.map((size) => (
          <option key={size} value={size}>
            {size} x {size}
          </option>
        ))}
      </select>
    </div>
  );
}

export { createMatrix, MATRIX_SIZES };
