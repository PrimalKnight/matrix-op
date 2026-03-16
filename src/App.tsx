import { useMemo, useState } from 'react';
import MatrixGrid from './components/MatrixGrid';
import MatrixSelector from './components/MatrixSelector';
import OperationCanvas from './components/OperationCanvas';
import HistoryView from './components/HistoryView';
import { Matrix, createZeroMatrix, permuteCols, permuteRows, setCell } from './lib/matrix';
import { createIdentityMatrix } from './lib/identity';

type HistoryEntry = {
  matrix: Matrix;
  description: string;
};

export default function App() {
  const [size, setSize] = useState(3);
  const [matrix, setMatrix] = useState<Matrix>(() => createZeroMatrix(3));
  const [identity, setIdentity] = useState<Matrix>(() => createIdentityMatrix(3));
  const [history, setHistory] = useState<HistoryEntry[]>([
    { matrix: createZeroMatrix(3), description: 'Initial matrix' },
  ]);

  const handleResize = (nextSize: number) => {
    const nextMatrix = createZeroMatrix(nextSize);
    setSize(nextSize);
    setMatrix(nextMatrix);
    setIdentity(createIdentityMatrix(nextSize));
    setHistory([{ matrix: nextMatrix, description: `Resized to ${nextSize}×${nextSize}` }]);
  };

  const updateMatrix = (next: Matrix, description: string, nextIdentity = identity) => {
    setMatrix(next);
    setIdentity(nextIdentity);
    setHistory((prev) => [...prev, { matrix: next, description }]);
  };

  const historyEntries = useMemo(() => history.slice(-8), [history]);

  return (
    <main className="app-shell">
      <header>
        <h1>Matrix Workflow Playground</h1>
      </header>

      <MatrixSelector value={size} onChange={handleResize} />

      <section className="workspace">
        <MatrixGrid
          title="Editable Matrix"
          matrix={matrix}
          onCellChange={(row, col, value) =>
            updateMatrix(setCell(matrix, row, col, value), `Set (${row + 1}, ${col + 1}) = ${value}`)
          }
        />

        <MatrixGrid title="Identity / Transform Tracker" matrix={identity} />

        <OperationCanvas
          size={size}
          onReorder={(mode, permutation, description) => {
            const nextMatrix = mode === 'row' ? permuteRows(matrix, permutation) : permuteCols(matrix, permutation);
            const nextIdentity =
              mode === 'row' ? permuteRows(identity, permutation) : permuteCols(identity, permutation);

            updateMatrix(nextMatrix, description, nextIdentity);
          }}
        />
      </section>

      <HistoryView entries={historyEntries} />
    </main>
  );
}
