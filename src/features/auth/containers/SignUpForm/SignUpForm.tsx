'use client';

import dayjs from 'dayjs';
import type { FormApi } from 'final-form';
import { useSearchParams } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { FieldInputProps } from 'react-final-form';
import { Form, Field, FormSpy } from 'react-final-form';

import { AuthApi } from '@/api/AuthApi';
import type { ErrorT } from '@/api/axios';
import { GoogleIcon } from '@/assets/icons';
import { referralStorage } from '@/core/ReferralStorage/ReferralStorage';
import { Button, FieldError, FormInput } from '@/lib/components';
import { LinkWithCheckbox, TextWithLink } from '@/lib/components/form';
import { routes } from '@/routes';
import type { FieldNames } from '@/types/common';
import { composeValidators, isEmail, isRequired, isValidPassword } from '@/utils';

import { data, ERROR_MESSAGE_TO_TEXT } from './constants';

interface FormData {
  email: string;
  password: string;
  repeatPassword: string;
  isAgreeTerms: boolean;
}

const fieldNames: FieldNames<FormData> = {
  email: 'email',
  password: 'password',
  repeatPassword: 'repeatPassword',
  isAgreeTerms: 'isAgreeTerms',
};

const initialValues = {
  email: '',
  password: '',
  repeatPassword: '',
  isAgreeTerms: false,
};

const { emailInput, passwordInput, repeatPasswordInput, agreeTermsCheckbox, buttonText, questionLink, googleBtnText } =
  data;

interface Props {
  onSubmit: (isEmail: { type: string; value?: { email: string; password: string } }) => void;
}

const api = new AuthApi();

export function SignUpForm({ onSubmit }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const referralCode = referralStorage.getItem('referralCode');
  const storageExpiryDate = referralStorage.getItem('expiry');
  const now = dayjs();

  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const handleSubmit = async (
    values: Pick<FormData, 'email' | 'password'> & { signupCode?: string },
    form: FormApi<FormData, Partial<FormData>>,
  ) => {
    form?.restart?.();

    try {
      setLoading(true);

      if (referralCode && !now.isAfter(dayjs(storageExpiryDate))) {
        values.signupCode = referralCode;
      }

      if (now.isAfter(dayjs(storageExpiryDate))) {
        referralStorage.setItem('referralCode', null);
        referralStorage.setItem('expiry', null);
      }

      const response = await api.signUp(values);

      if (response === 201) {
        onSubmit({
          type: 'new',
          value: { email: values.email, password: values.password },
        });
      }
    } catch (err) {
      const error = err as ErrorT;

      setError(ERROR_MESSAGE_TO_TEXT[error.message] ?? 'Oups, something went wrong');
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
      render={({ handleSubmit, submitting }) => (
        <form
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
          className="flex w-full flex-col gap-5"
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
                }}
                label={repeatPasswordInput.label}
                type={repeatPasswordInput.type}
              />
            )}
          </Field>
          <Field name={fieldNames.isAgreeTerms} validate={isRequired('Agree terms')} type="checkbox">
            {({ input, meta }) => {
              return (
                <LinkWithCheckbox
                  inputProps={{ ...input }}
                  text={agreeTermsCheckbox.text}
                  linkText={agreeTermsCheckbox.linkText}
                  linkHref={agreeTermsCheckbox.linkHref}
                  color="colored"
                  type="secondary"
                  error={meta.touched && meta.error ? (meta.error as string) : undefined}
                />
              );
            }}
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

          {error && <FieldError error={error} />}

          <span className="relative my-4 hidden h-5 border-b border-gray-200">
            <p className="absolute left-[45%] top-[45%] bg-white px-2 text-sm font-medium text-gray-600">OR</p>
          </span>

          <button
            type="button"
            className="mt-3 hidden w-full items-center justify-center gap-3 rounded-2 border p-2.5 text-md font-semibold text-gray-700"
          >
            <GoogleIcon />
            {googleBtnText}
          </button>
          <TextWithLink
            linkText={questionLink.linkText}
            linkHref={redirect ? routes.signin.getRedirectPath({ redirect }) : routes.signin.getRedirectPath()}
            text={questionLink.text}
          />
        </form>
      )}
    />
  );
}
