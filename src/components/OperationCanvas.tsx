import { useState } from 'react';

type Axis = 'row' | 'col';

type OperationCanvasProps = {
  size: number;
  onSwap: (axis: Axis, from: number, to: number) => void;
};

export default function OperationCanvas({ size, onSwap }: OperationCanvasProps) {
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [axis, setAxis] = useState<Axis>('row');

  const labels = Array.from({ length: size }, (_, i) => i);

  return (
    <section className="panel">
      <h2>Operation Canvas</h2>
      <p>Drag index chips to swap rows or columns.</p>
      <div className="toggle-row">
        <button className={axis === 'row' ? 'active' : ''} onClick={() => setAxis('row')}>
          Rows
        </button>
        <button className={axis === 'col' ? 'active' : ''} onClick={() => setAxis('col')}>
          Columns
        </button>
      </div>
      <div className="drag-list">
        {labels.map((idx) => (
          <button
            key={idx}
            draggable
            className="drag-chip"
            onDragStart={() => setDragFrom(idx)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (dragFrom === null || dragFrom === idx) return;
              onSwap(axis, dragFrom, idx);
              setDragFrom(null);
            }}
          >
            {axis} {idx}
          </button>
        ))}
      </div>
    </section>
  );
}
