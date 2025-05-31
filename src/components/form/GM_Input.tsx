import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

type TInputProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
};

const GM_Input = ({
  name,
  label,
  type,
  placeholder,
  required = false,
  disabled = false,
  className,
}: TInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          <Label
            htmlFor={name}
            className={cn(
              required && "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {label}
          </Label>
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
          />
          {error && (
            <p className="text-sm text-red-500 mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default GM_Input;
