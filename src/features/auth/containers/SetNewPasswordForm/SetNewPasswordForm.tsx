'use client';

import { useSearchParams } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { FieldInputProps } from 'react-final-form';
import { Form, Field, FormSpy } from 'react-final-form';

import { AuthApi } from '@/api/AuthApi';
import { Button, FieldError, FormInput } from '@/lib/components';
import type { FieldNames } from '@/types/common';
import { composeValidators, isRequired, isValidPassword } from '@/utils';

import { data } from './constants';

interface FormData {
  password: string;
  repeatPassword: string;
}

const fieldNames: FieldNames<FormData> = {
  password: 'password',
  repeatPassword: 'repeatPassword',
};

const initialValues = {
  password: '',
  repeatPassword: '',
};

const { passwordInput, repeatPasswordInput, buttonText } = data;

interface Props {
  onSubmit: () => void;
}

const api = new AuthApi();

export function SetNewPasswordForm(props: Props) {
  const { onSubmit } = props;
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: FormData) => {
    const token = searchParams.get('token');

    if (token) {
      setLoading(true);
      try {
        const response = await api.resetPassword({
          password: values.repeatPassword,
          token,
        });
        if (response === 200) {
          onSubmit();
        }
      } catch (err) {
        console.log('err', err);
      }
    }
    setLoading(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, input: FieldInputProps<unknown, HTMLElement>) => {
    input.onChange(e.target.value.trim());
  };

  return (
    <Form<FormData>
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validate={(values: FormData) => {
        const errors = {} as Record<keyof FormData, string | undefined>;
        if (values.password !== values.repeatPassword) {
          errors[fieldNames.repeatPassword] = 'Repeat password is incorrect';
        }
        return errors;
      }}
      render={({ handleSubmit, submitting, submitError }) => (
        <form
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
          className="flex w-full flex-col gap-5"
        >
          <Field name={fieldNames.password} validate={composeValidators(isRequired('Password'), isValidPassword)}>
            {({ input, meta }) => (
              <FormInput
                error={meta.touched && meta.error ? (meta.error as string) : undefined}
                inputProps={{
                  ...input,
                  placeholder: passwordInput.placeHolder,
                  onChange: (e) => handleInputChange(e, input),
                }}
                label={passwordInput.label}
                type={passwordInput.type}
              />
            )}
          </Field>
          <Field
            name={fieldNames.repeatPassword}
            validate={composeValidators(isRequired('Repeat Password'), isValidPassword)}
          >
            {({ input, meta }) => (
              <FormInput
                error={meta.touched && meta.error ? (meta.error as string) : undefined}
                inputProps={{
                  ...input,
                  placeholder: repeatPasswordInput.placeHolder,
                  onChange: (e) => handleInputChange(e, input),
                }}
                label={repeatPasswordInput.label}
                type={repeatPasswordInput.type}
              />
            )}
          </Field>

          <FormSpy<FormData> subscription={{ hasValidationErrors: true }}>
            {({ hasValidationErrors }: { hasValidationErrors: boolean }) => (
              <Button
                size="lg"
                color="primary"
                type="submit"
                loading={loading}
                className="mt-1.5"
                disabled={submitting || hasValidationErrors}
                content={buttonText}
              />
            )}
          </FormSpy>

          {submitError && <FieldError error={submitError as string} />}
        </form>
      )}
    />
  );
}
