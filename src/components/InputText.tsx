interface IInputTextProps {
  label: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

export function InputText({
  placeholder,
  value,
  label,
  onChange,
}: IInputTextProps) {
  return (
    <div>
      <h4>{label}</h4>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
