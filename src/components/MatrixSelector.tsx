type MatrixSelectorProps = {
  value: number;
  onChange: (size: number) => void;
};

const options = [2, 3, 4];

export default function MatrixSelector({ value, onChange }: MatrixSelectorProps) {
  return (
    <label className="panel selector">
      Matrix Size
      <select value={value} onChange={(event) => onChange(Number(event.target.value))}>
        {options.map((size) => (
          <option key={size} value={size}>
            {size}x{size}
          </option>
        ))}
      </select>
    </label>
  );
}
