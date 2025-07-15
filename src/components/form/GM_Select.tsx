import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Option = { value: string; label: string };

interface GM_SelectProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const GM_Select = ({
  name,
  label,
  options,
  placeholder,
  required = false,
  className,
}: GM_SelectProps) => {
  const { control } = useFormContext();

  return (
    <div className={className}>
      <Label
        htmlFor={name}
        className={
          required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""
        }
      >
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder || label} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && (
              <span className="text-red-500 text-xs">{error.message}</span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default GM_Select;
