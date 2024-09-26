'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { FieldInputProps } from 'react-final-form';
import { Form, Field, FormSpy } from 'react-final-form';

import { GoogleIcon } from '@/assets/icons';
import { Button, FormInput } from '@/lib/components';
import { LinkWithCheckbox, TextWithLink } from '@/lib/components/form';
import { routes } from '@/routes';
import type { SignInErrors } from '@/types';
import { isString, type FieldNames } from '@/types/common';
import { composeValidators, isEmail, isRequired } from '@/utils';

import { data } from './constants';

interface FormData {
  email: string;
  password: string;
  IsRememberLogin: boolean;
}

const fieldNames: FieldNames<FormData> = {
  email: 'email',
  password: 'password',
  IsRememberLogin: 'IsRememberLogin',
};

const initialValues = {
  email: '',
  password: '',
  IsRememberLogin: false,
};

const { emailInput, passwordInput, rememberLoginCheckbox, buttonText, questionLink, googleBtnText } = data;

interface Props {
  onSuccess: (isAccExists: boolean) => void;
  setErrorText: (a: SignInErrors) => void;
}

export function SignInForm(props: Props) {
  const { onSuccess, setErrorText } = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const handleSubmit = async (values: FormData) => {
    setLoading(true);

    const signInResponse = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInResponse) {
      if (isString(signInResponse.url)) {
        router.push('/');
      } else {
        setErrorText(signInResponse.error as SignInErrors);
        onSuccess(false);
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
      render={({ handleSubmit, submitting }) => {
        return (
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
            <Field name={fieldNames.password} validate={isRequired('Password')}>
              {({ input, meta }) => {
                return (
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
                );
              }}
            </Field>
            <Field name={fieldNames.IsRememberLogin} type="checkbox">
              {({ input, meta }) => (
                <LinkWithCheckbox
                  inputProps={{ ...input }}
                  text={rememberLoginCheckbox.text}
                  linkText={rememberLoginCheckbox.linkText}
                  linkHref={rememberLoginCheckbox.linkHref}
                  color="colored"
                  type="secondary"
                  itemsJustify="space-between"
                  error={meta.touched && meta.error ? (meta.error as string) : undefined}
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
                  disabled={submitting || hasValidationErrors}
                  content={buttonText}
                />
              )}
            </FormSpy>

            {/* TODO Implement google auth integration */}

            <span className="relative mb-6 mt-[7px] hidden h-5 border-b border-gray-200">
              <p className="absolute left-[45%] top-[45%] bg-white px-2 text-sm font-medium text-gray-600">OR</p>
            </span>

            <button
              type="button"
              className="mt-3 flex hidden w-full items-center justify-center gap-3 rounded-2 border p-2.5 text-md font-semibold text-gray-700"
              // TODO add callback url to dashboard
              // onClick={() => signIn('google', { callbackUrl: '/' })}
            >
              <GoogleIcon />
              {googleBtnText}
            </button>

            <TextWithLink
              linkText={questionLink.linkText}
              linkHref={redirect ? routes.signup.getRedirectPath({ redirect }) : routes.signup.getRedirectPath()}
              text={questionLink.text}
            />
          </form>
        );
      }}
    />
  );
}
