import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Textarea } from "@ui/textarea";

type FieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  isTextarea?: boolean;
  value?: string; // Убедитесь, что value передается
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void; // Убедитесь, что onChange обрабатывается
  error?: boolean;
};

const Field: React.FC<FieldProps> = ({
  id,
  label,
  placeholder = "",
  type = "text",
  isTextarea = false,
  value = "",
  onChange,
  error = false,
}) => (
  <div className="space-y-2 font-inter lg:flex-1">
    <Label htmlFor={id} className="text-[#171D3D] font-normal text-base">
      {label}
    </Label>
    {isTextarea ? (
      <Textarea
        id={id}
        value={value}
        onChange={onChange} // Привязка обработчика изменения
        placeholder={placeholder}
        className={`px-0 border-b bg-transparent rounded-none font-normal focus-visible:border-orange-500 focus-visible:ring-orange-200 ${
          error ? "border-red-500" : ""
        }`}
      />
    ) : (
      <Input
        id={id}
        value={value}
        onChange={onChange} // Привязка обработчика изменения
        placeholder={placeholder}
        type={type}
        className={`px-0 border-b bg-transparent rounded-none font-normal focus-visible:border-orange-500 focus-visible:ring-orange-200 ${
          error ? "border-red-500" : ""
        }`}
      />
    )}
    {error && (
      <p className="mt-2 text-xs text-red-500" role="alert" aria-live="polite">
        Заполните поле
      </p>
    )}
  </div>
);

export default Field;
