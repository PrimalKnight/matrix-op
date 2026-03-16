import { useMemo, useState } from 'react';
import MatrixGrid from './components/MatrixGrid';
import MatrixSelector from './components/MatrixSelector';
import OperationCanvas from './components/OperationCanvas';
import HistoryView from './components/HistoryView';
import { Matrix, cloneMatrix, createZeroMatrix, setCell } from './lib/matrix';
import { applyColSwapToPair, applyRowSwapToPair, createIdentityMatrix } from './lib/identity';

export default function App() {
  const [size, setSize] = useState(3);
  const [matrix, setMatrix] = useState<Matrix>(() => createZeroMatrix(3));
  const [identity, setIdentity] = useState<Matrix>(() => createIdentityMatrix(3));
  const [historySnapshots, setHistorySnapshots] = useState<Matrix[]>([createZeroMatrix(3)]);
  const [historyOperationLabels, setHistoryOperationLabels] = useState<string[]>([]);

  const handleResize = (nextSize: number) => {
    const nextMatrix = createZeroMatrix(nextSize);
    setSize(nextSize);
    setMatrix(nextMatrix);
    setIdentity(createIdentityMatrix(nextSize));
    setHistorySnapshots([cloneMatrix(nextMatrix)]);
    setHistoryOperationLabels([]);
  };

  const updateMatrix = (next: Matrix, nextIdentity = identity, operationLabel?: string) => {
    setMatrix(next);
    setIdentity(nextIdentity);

    if (operationLabel) {
      setHistorySnapshots((prev) => [...prev, cloneMatrix(next)]);
      setHistoryOperationLabels((prev) => [...prev, operationLabel]);
    }
  };

  const historyEntries = useMemo(() => historySnapshots, [historySnapshots]);

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
          onCellChange={(row, col, value) => updateMatrix(setCell(matrix, row, col, value))}
        />

        <MatrixGrid title="Identity / Transform Tracker" matrix={identity} />

        <OperationCanvas
          size={size}
          onSwap={(axis, from, to) => {
            const result =
              axis === 'row'
                ? applyRowSwapToPair(matrix, identity, from, to)
                : applyColSwapToPair(matrix, identity, from, to);

            const operationLabel = `${axis === 'row' ? 'R' : 'C'}${from} ↔ ${axis === 'row' ? 'R' : 'C'}${to}`;

            updateMatrix(result.matrix, result.identity, operationLabel);
          }}
        />
      </section>

      <HistoryView entries={historyEntries} operationLabels={historyOperationLabels} />
    </main>
  );
}
