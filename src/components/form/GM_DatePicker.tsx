"use client";
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type GM_DatePickerProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  captionLayout?: "dropdown" | "label" | "dropdown-months" | "dropdown-years";
  buttonWidth?: string;
  dateFormat?: string;
};

const GM_DatePicker = ({
  name,
  label,
  placeholder = "Select date",
  required = false,
  disabled = false,
  className,
  captionLayout = "dropdown",
  buttonWidth = "w-full",
  dateFormat = "PPP", // Default: "January 1, 2024"
}: GM_DatePickerProps) => {
  const { control } = useFormContext();
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("flex flex-col gap-2", className)}>
          <Label
            htmlFor={name}
            className={cn(
              "px-1",
              required && "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {label}
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id={name}
                disabled={disabled}
                className={cn(
                  buttonWidth,
                  "justify-between font-normal",
                  !field.value && "text-muted-foreground",
                  error && "border-red-500 focus-visible:ring-red-500"
                )}
              >
                {field.value ? format(field.value, dateFormat) : placeholder}
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={field.value}
                captionLayout={captionLayout}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
                disabled={disabled}
              />
            </PopoverContent>
          </Popover>
          {error && (
            <p className="text-sm text-red-500 mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default GM_DatePicker;
