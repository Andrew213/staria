'use client';

import type { FormApi } from 'final-form';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { FieldInputProps } from 'react-final-form';
import { Form, Field, FormSpy } from 'react-final-form';

import { AuthApi } from '@/api/AuthApi';
import { Button, FieldError, FormInput } from '@/lib/components';
import type { FieldNames } from '@/types/common';
import { composeValidators, isEmail, isRequired } from '@/utils';

import { data } from './constants';

interface FormData {
  email: string;
}

const fieldNames: FieldNames<FormData> = {
  email: 'email',
};

const initialValues = {
  email: '',
};

const { emailInput, buttonText } = data;

interface Props {
  onSuccess: (email: string, isSuccess: boolean) => void;
  title: string;
  subtitle: string;
}
const api = new AuthApi();
export function ResetPasswordForm(props: Props) {
  const { onSuccess, title, subtitle } = props;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormData, form: FormApi<FormData, Partial<FormData>>) => {
    try {
      setLoading(true);
      // TODO improve handling errors when BE will be ready
      form?.restart?.();
      const response = await api.requestPassword(values.email);
      if (response === 200) {
        onSuccess(values.email, true);
      }
    } catch (err) {
      console.log('err', err);
    }
    setLoading(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, input: FieldInputProps<unknown, HTMLElement>) => {
    input.onChange(e.target.value.trim());
  };

  return (
    <div className="flex flex-col items-center lg:mb-[248px] lg:mt-[141px]">
      {title && subtitle && (
        <div className="mb-6 flex w-full flex-col items-center gap-2 lg:items-start lg:gap-3">
          <h1 className="text-display-xs font-semibold text-gray-900 lg:text-display-sm">{title}</h1>
          <p className="font-rubik text-md font-normal text-gray-600">{subtitle}</p>
        </div>
      )}

      <Form<FormData>
        onSubmit={handleSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, submitting, submitError }) => (
          <form
            onSubmit={(e) => {
              void handleSubmit(e);
            }}
            className="flex w-full flex-col justify-center align-middle"
          >
            <Field name={fieldNames.email} validate={composeValidators(isRequired('Email'), isEmail)}>
              {({ input, meta }) => (
                <FormInput
                  error={meta.touched && meta.error ? (meta.error as string) : undefined}
                  inputProps={{
                    ...input,
                    placeholder: emailInput.placeHolder,
                    autoComplete: 'email',
                    onChange: (e) => handleInputChange(e, input),
                  }}
                  label={emailInput.label}
                  type={emailInput.type}
                />
              )}
            </Field>
            <FormSpy<FormData> subscription={{ hasValidationErrors: true }}>
              {({ hasValidationErrors }: { hasValidationErrors: boolean }) => (
                <Button
                  size="lg"
                  color="primary"
                  type="submit"
                  className="mt-3"
                  loading={loading}
                  disabled={submitting || hasValidationErrors}
                  content={buttonText}
                />
              )}
            </FormSpy>

            {submitError && <FieldError error={submitError as string} />}
          </form>
        )}
      />
    </div>
  );
}
