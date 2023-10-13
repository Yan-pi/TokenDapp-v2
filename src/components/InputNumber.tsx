interface IInputNumberProps {
  label: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

export function InputNumber({
  placeholder,
  value,
  label,
  onChange,
}: IInputNumberProps) {
  return (
    <div>
      <h3>{label}</h3>
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
