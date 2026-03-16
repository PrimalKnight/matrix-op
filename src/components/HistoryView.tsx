import { Matrix } from '../lib/matrix';

type HistoryViewProps = {
  entries: Matrix[];
};

export default function HistoryView({ entries }: HistoryViewProps) {
  return (
    <section className="panel history">
      <h2>History</h2>
      <div className="history-track">
        {entries.map((matrix, index) => (
          <div key={`history-${index}`} className="history-item">
            <div className="mini-matrix" style={{ gridTemplateColumns: `repeat(${matrix.length}, 1fr)` }}>
              {matrix.flat().map((value, cellIndex) => (
                <span key={cellIndex}>{value}</span>
              ))}
            </div>
            {index < entries.length - 1 ? <strong className="separator">=</strong> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
