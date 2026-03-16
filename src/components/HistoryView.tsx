import { Matrix } from '../lib/matrix';

type HistoryEntry = {
  matrix: Matrix;
  operationLabel?: string;
};

type HistoryViewProps = {
  entries: HistoryEntry[];
};

export default function HistoryView({ entries }: HistoryViewProps) {
  return (
    <section className="panel history">
      <h2>History</h2>
      <div className="history-track" role="list" aria-label="Matrix snapshot history">
        {entries.map((entry, index) => {
          const hasNext = index < entries.length - 1;

          return (
            <div key={`history-${index}`} className="history-step" role="listitem">
              <div className="history-item">
                <div className="mini-matrix" style={{ gridTemplateColumns: `repeat(${entry.matrix.length}, 1fr)` }}>
                  {entry.matrix.flat().map((value, cellIndex) => (
                    <span key={cellIndex}>{value}</span>
                  ))}
                </div>
                <small className="history-label">M{index}</small>
              </div>

              {hasNext ? (
                <div className="history-link" aria-hidden="true">
                  {entry.operationLabel ? <small className="history-op-label">{entry.operationLabel}</small> : null}
                  <strong className="separator">=</strong>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
