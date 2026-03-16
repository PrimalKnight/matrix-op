import { Matrix } from '../lib/matrix';

type HistoryEntry = {
  matrix: Matrix;
  description: string;
};

type HistoryViewProps = {
  entries: HistoryEntry[];
};

export default function HistoryView({ entries }: HistoryViewProps) {
  return (
    <section className="panel history">
      <h2>History</h2>
      <div className="history-track">
        {entries.map((entry, index) => (
          <div key={`history-${index}`} className="history-item">
            <div className="mini-matrix" style={{ gridTemplateColumns: `repeat(${entry.matrix.length}, 1fr)` }}>
              {entry.matrix.flat().map((value, cellIndex) => (
                <span key={cellIndex}>{value}</span>
              ))}
            </div>
            <small className="history-label">{entry.description}</small>
            {index < entries.length - 1 ? <strong className="separator">=</strong> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
