import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export type CheckboxOption = { value: string; label: string };

interface GM_CheckboxGroupProps {
  name: string;
  label: string;
  options: CheckboxOption[];
  className?: string;
}

const GM_CheckboxGroup = ({
  name,
  label,
  options,
  className,
}: GM_CheckboxGroupProps) => {
  const { control } = useFormContext();
  return (
    <div className={className}>
      <Label>{label}</Label>
      <Controller
        name={name}
        render={({ field }) => (
          <div className="grid grid-cols-2 gap-2 mt-2 max-h-32 overflow-y-auto border rounded-md p-3">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${name}-${option.value}`}
                  checked={field.value?.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      field.onChange([...(field.value || []), option.value]);
                    } else {
                      field.onChange(
                        (field.value || []).filter(
                          (v: string) => v !== option.value
                        )
                      );
                    }
                  }}
                />
                <Label htmlFor={`${name}-${option.value}`} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default GM_CheckboxGroup;
