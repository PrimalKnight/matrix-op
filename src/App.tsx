import { useState } from 'react';
import MatrixGrid from './MatrixGrid';
import MatrixSelector, { createMatrix } from './MatrixSelector';

export default function App() {
  const [matrix, setMatrix] = useState<number[][]>(createMatrix(2));
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleMatrixChange = (nextMatrix: number[][]) => {
    setMatrix(nextMatrix);
    setIsConfirmed(false);
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  return (
    <main className="app">
      <h1>Matrix Operator</h1>
      <MatrixSelector onMatrixChange={handleMatrixChange} />
      <MatrixGrid
        matrix={matrix}
        isConfirmed={isConfirmed}
        onMatrixChange={handleMatrixChange}
        onConfirm={handleConfirm}
      />

      <section className="operations" aria-live="polite">
        <h2>Operations</h2>
        <button type="button" disabled={!isConfirmed}>
          Compute determinant
        </button>
        {!isConfirmed ? <p>Confirm your matrix to enable operations.</p> : <p>Matrix locked.</p>}
      </section>
    </main>
  );
}
