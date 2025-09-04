import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ReactNode } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type TextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  type?: "text" | "email" | "number" | "password" | "file";
  placeholder?: string;
  required?: boolean;
  action?: () => void;
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
  inputClass?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (value: string | File | undefined) => void;
  labelClass?: string;
};

/**
 * A text field component.
 * @param name The name of the field.
 * @param label The label of the field.
 * @param type The type of the field.
 * @param placeholder The placeholder of the field.
 * @param required If the field is required.
 * @param action The action to be performed on the field.
 * @param icon The icon of the field.
 * @param loading If the field is loading.
 * @param className The class name of the
 * @param inputClass The class name of the input.
 * @param disabled If the field is disabled.
 *
 * @returns The text field component.
 *
 * @example
 * ```tsx
 * <TextField name="name" label="Name" />
 * ```
 */

export const TextField = <T extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder = "Input",
  required = false,
  action,
  icon = <X size={16} className="text-muted-foreground" />,
  loading,
  className,
  inputClass,
  disabled = false,
  readOnly,
  onChange,
  labelClass = "text-white",
}: TextFieldProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel htmlFor={name}>
              <span className={cn(labelClass)}>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative flex items-center gap-2">
              {type === "file" ? (
                <Input
                  type="file"
                  id={name}
                  className={cn(
                    `w-full bg-[#F5F5F6] ${inputClass}`,
                    action && "pr-12"
                  )}
                  disabled={disabled}
                  readOnly={readOnly}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                    onChange?.(file);
                  }}
                  ref={field.ref}
                  name={field.name}
                />
              ) : (
                <Input
                  {...field}
                  type={type}
                  placeholder={placeholder ?? "Enter a value"}
                  className={cn(
                    `w-full bg-[#F5F5F6] ${inputClass}`,
                    action && "pr-12"
                  )}
                  id={name}
                  disabled={disabled}
                  readOnly={readOnly}
                  onChange={(e) => {
                    field.onChange(e);
                    onChange?.(e.target.value);
                  }}
                />
              )}

              {loading && <LoadingSpinner className="absolute right-4" />}

              {action && (
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  onClick={action}
                  type="button"
                  className="absolute right-0.5 top-0.5"
                >
                  {icon}
                </Button>
              )}
            </div>
          </FormControl>

          <FormMessage className="line-clamp-1 text-xs" />
        </FormItem>
      )}
    />
  );
};

TextField.displayName = "TextField";
