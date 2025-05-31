import type { ReactNode } from "react";
import {
  useForm,
  FormProvider,
  type FieldValues,
  type UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { cn } from "@/lib/utils";

type FormConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};

type TFormProps = {
  children: ReactNode;
  onSubmit: (data: FieldValues, methods: UseFormReturn<FieldValues>) => void;
  className?: string;
  resetOnSubmit?: boolean;
} & FormConfig;

const GM_Form = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
  className,
  resetOnSubmit = false,
}: TFormProps) => {
  const formConfig: UseFormProps = {};

  if (resolver) {
    formConfig.resolver = resolver;
  }

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  const methods = useForm(formConfig);
  const { handleSubmit } = methods;

  const submit = (data: FieldValues) => {
    onSubmit(data, methods);

    if (resetOnSubmit) {
      methods.reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(submit)}
        className={cn("space-y-4", className)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default GM_Form;
