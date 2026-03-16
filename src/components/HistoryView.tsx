import { Matrix } from '../lib/matrix';

type HistoryViewProps = {
  entries: Matrix[];
  operationLabels?: string[];
};

export default function HistoryView({ entries, operationLabels = [] }: HistoryViewProps) {
  return (
    <section className="panel history">
      <h2>History</h2>
      <div className="history-track" role="list" aria-label="Matrix history sequence">
        {entries.map((matrix, index) => (
          <div key={`history-${index}`} className="history-step" role="listitem">
            <div className="history-item">
              <div className="mini-matrix" style={{ gridTemplateColumns: `repeat(${matrix.length}, 1fr)` }}>
                {matrix.flat().map((value, cellIndex) => (
                  <span key={cellIndex}>{value}</span>
                ))}
              </div>
            </div>

            {index < entries.length - 1 ? (
              <div className="history-operator" aria-label={operationLabels[index] ?? 'step separator'}>
                <strong className="separator">=</strong>
                {operationLabels[index] ? <span className="operation-label">{operationLabels[index]}</span> : null}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
