import type { ReactNode } from "react";
import {
  useForm,
  FormProvider,
  type FieldValues,
  type SubmitHandler,
  type UseFormProps,
} from "react-hook-form";
import { cn } from "@/lib/utils";

type FormConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};

type TFormProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  className?: string;
  resetOnSubmit?: boolean;
} & FormConfig;

const GM_Form = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
  className,
  resetOnSubmit = true,
}: TFormProps) => {
  const formConfig: UseFormProps = {};

  if (resolver) {
    formConfig.resolver = resolver;
  }

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit = (data: FieldValues) => {
    onSubmit(data);
    if (resetOnSubmit) {
      reset();
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
