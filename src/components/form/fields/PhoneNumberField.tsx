"use client";

import { FieldValues, Path, useFormContext } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

type PhoneNumberFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
  inputClass?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (value: { countryCode: any }) => void;
};

export const PhoneNumberField = <T extends FieldValues>({
  name,
  label,
  required,
  className,
  inputClass,
  disabled,
  readOnly,
  onChange,
}: PhoneNumberFieldProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel htmlFor={name}>
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <PhoneInput
              defaultCountry="ca"
              {...field}
              value={field.value || ""}
              onChange={(value, country) => {
                // react-hook-form
                field.onChange(value);

                // external callback with country info
                if (onChange) {
                  onChange({
                    countryCode: country.country,
                  });
                }
              }}
              inputClassName={cn(
                "bg-[#F5F5F6] w-full rounded-md px-3 py-2 border border-input text-sm",
                inputClass
              )}
              disabled={disabled}
              inputProps={{ readOnly }}
            />
          </FormControl>
          <FormMessage className="line-clamp-1 text-xs" />
        </FormItem>
      )}
    />
  );
};

PhoneNumberField.displayName = "PhoneNumberField";
