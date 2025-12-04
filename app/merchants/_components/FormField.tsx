'use client';

import { FieldError, Path, UseFormRegister } from 'react-hook-form';
import {
  MerchantCreateFormData,
  MerchantEditFormData,
} from '@/schemas/merchant';

interface FormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  error?: FieldError;
  children: React.ReactNode;
}

export const FormField = ({
  label,
  id,
  required = false,
  error,
  children,
}: FormFieldProps) => {
  return (
    <div className="flex flex-row items-start gap-1">
      <label
        htmlFor={id}
        className="w-32 pt-2 text-sm font-medium text-gray-500"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex-1">
        {children}
        {error && (
          <p
            id={`${id}-error`}
            className="mt-1 text-xs text-red-500"
            role="alert"
          >
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

type FormDataUnion = MerchantEditFormData | MerchantCreateFormData;

interface FormInputProps<T extends FormDataUnion> {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  error?: FieldError;
}

export const FormInput = <T extends FormDataUnion>({
  id,
  label,
  type = 'text',
  placeholder,
  required = false,
  register,
  fieldName,
  error,
}: FormInputProps<T>) => {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <FormField label={label} id={id} required={required} error={error}>
      <input
        id={id}
        type={type}
        {...register(fieldName)}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorId}
        className={`w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none ${
          error
            ? 'border-red-300 focus:ring-red-200'
            : 'border-gray-300 focus:ring-blue-200'
        }`}
        placeholder={placeholder}
      />
    </FormField>
  );
};

interface FormSelectProps<T extends FormDataUnion = FormDataUnion> {
  id: string;
  label: string;
  required?: boolean;
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  error?: FieldError;
  children: React.ReactNode;
}

export const FormSelect = <T extends FormDataUnion>({
  id,
  label,
  required = false,
  register,
  fieldName,
  error,
  children,
}: FormSelectProps<T>) => {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <FormField label={label} id={id} required={required} error={error}>
      <select
        id={id}
        {...register(fieldName)}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorId}
        className={`w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none ${
          error
            ? 'border-red-300 focus:ring-red-200'
            : 'border-gray-300 focus:ring-blue-200'
        }`}
      >
        {children}
      </select>
    </FormField>
  );
};

interface FormReadOnlyFieldProps {
  label: string;
  value: string;
}

export const FormReadOnlyField = ({ label, value }: FormReadOnlyFieldProps) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <label className="w-32 text-sm font-medium text-gray-500">{label}</label>
      <span className="flex-1 text-sm text-gray-900">{value}</span>
    </div>
  );
};
