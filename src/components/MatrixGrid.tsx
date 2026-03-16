import { Matrix } from '../lib/matrix';

type MatrixGridProps = {
  title: string;
  matrix: Matrix;
  onCellChange?: (row: number, col: number, value: number) => void;
};

export default function MatrixGrid({ title, matrix, onCellChange }: MatrixGridProps) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <div className="matrix-grid" style={{ gridTemplateColumns: `repeat(${matrix.length}, 1fr)` }}>
        {matrix.map((row, rowIndex) =>
          row.map((value, colIndex) => {
            const key = `${rowIndex}-${colIndex}`;
            return onCellChange ? (
              <input
                key={key}
                className="cell-input"
                type="number"
                value={value}
                onChange={(event) => onCellChange(rowIndex, colIndex, Number(event.target.value || 0))}
              />
            ) : (
              <output key={key} className="cell-output">
                {value}
              </output>
            );
          }),
        )}
      </div>
    </section>
  );
}
