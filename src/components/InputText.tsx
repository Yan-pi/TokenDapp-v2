import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <Label>{label}</Label>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
