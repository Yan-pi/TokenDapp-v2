import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"

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
      <Label>{ label }</Label>
      <Input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
