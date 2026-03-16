import { useEffect, useMemo, useState } from 'react';
import { moveIndex } from '../lib/matrix';

type OperationMode = 'row' | 'col';

type OperationCanvasProps = {
  size: number;
  onReorder: (mode: OperationMode, permutation: number[], description: string) => void;
};

const MODE_LABELS: Record<OperationMode, string> = {
  row: 'Row Operations',
  col: 'Column Operations',
};

export default function OperationCanvas({ size, onReorder }: OperationCanvasProps) {
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [mode, setMode] = useState<OperationMode>('row');
  const [lockedMode, setLockedMode] = useState<OperationMode | null>(null);
  const [order, setOrder] = useState<number[]>(() => Array.from({ length: size }, (_, i) => i));

  useEffect(() => {
    setOrder(Array.from({ length: size }, (_, i) => i));
    setDragFrom(null);
    setMode('row');
    setLockedMode(null);
  }, [size]);

  const canSwitchMode = lockedMode === null;

  const helperText = useMemo(
    () =>
      canSwitchMode
        ? 'Select a mode, then drag labels to reorder.'
        : `${MODE_LABELS[lockedMode]} active. Reset canvas to switch mode.`,
    [canSwitchMode, lockedMode],
  );

  const resetCanvas = () => {
    setOrder(Array.from({ length: size }, (_, i) => i));
    setLockedMode(null);
    setMode('row');
    setDragFrom(null);
  };

  return (
    <section className="panel">
      <h2>Operation Canvas</h2>
      <p>{helperText}</p>
      <div className="toggle-row">
        <button
          className={mode === 'row' ? 'active' : ''}
          onClick={() => setMode('row')}
          disabled={!canSwitchMode && mode !== 'row'}
        >
          Row Operations
        </button>
        <button
          className={mode === 'col' ? 'active' : ''}
          onClick={() => setMode('col')}
          disabled={!canSwitchMode && mode !== 'col'}
        >
          Column Operations
        </button>
        <button className="ghost" onClick={resetCanvas}>
          Reset
        </button>
      </div>

      <div className="drag-list">
        {order.map((matrixIndex, dropIndex) => (
          <button
            key={`${mode}-${matrixIndex}`}
            draggable
            className="drag-chip"
            onDragStart={() => setDragFrom(dropIndex)}
            onDragOver={(event) => event.preventDefault()}
            onDragEnd={() => setDragFrom(null)}
            onDrop={() => {
              if (dragFrom === null || dragFrom === dropIndex) return;

              const permutation = moveIndex(order, dragFrom, dropIndex);
              const moved = order[dragFrom] + 1;
              const target = order[dropIndex] + 1;
              const prefix = mode === 'row' ? 'R' : 'C';

              setOrder(permutation);
              setLockedMode(mode);
              onReorder(mode, permutation, `${prefix}${moved} ↔ ${prefix}${target}`);
              setDragFrom(null);
            }}
          >
            {mode === 'row' ? 'R' : 'C'}{matrixIndex + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
