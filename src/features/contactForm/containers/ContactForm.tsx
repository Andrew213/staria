'use client';

import type { FormApi } from 'final-form';
import { useState } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';

import { contactApi } from '@/api/ContactApi';
import type { PostContactOptions } from '@/api/types';
import { Button, FieldError, FormInput, NotifyMessage, TextArea } from '@/lib/components';
import { LinkWithCheckbox } from '@/lib/components/form';
import type { FieldNames } from '@/types/common';
import { composeValidators, isEmail, isRequired, omitKeys, textSanitize } from '@/utils';

import { data } from '../constants';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  text: string;
  isAgreePrivacy: boolean;
}

const fieldNames: FieldNames<FormData> = {
  first_name: 'first_name',
  last_name: 'last_name',
  email: 'email',
  phone_number: 'phone_number',
  text: 'text',
  isAgreePrivacy: 'isAgreePrivacy',
};

const initialValues: FormData = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  text: '',
  isAgreePrivacy: false,
};

const {
  firstNameInput,
  lastNameInput,
  emailInput,

  messageInput,
  privacyCheckbox,
  buttonText,
  successMessage,
} = data;

export function ContactForm() {
  const [isSuccessSend, setIsSuccessSend] = useState(false);

  const handleSubmit = async (values: FormData, form: FormApi<FormData, Partial<FormData>>) => {
    try {
      const isOmitPhoneNumber =
        values.phone_number.length < 1 ? 'phone_number' : ('' as typeof fieldNames.phone_number);
      const updatedValues = {
        ...values,
        phone_number: `+${values.phone_number}`,
        text: textSanitize(values.text),
      };
      const omittedValues = omitKeys(updatedValues, ['isAgreePrivacy', isOmitPhoneNumber]) as PostContactOptions;

      const payload = {
        ...omittedValues,
        subject: 'Contact us',
      };

      await contactApi.sendMessage(payload);
      form?.restart?.();
      setIsSuccessSend(true);
    } catch (err) {
      // TODO: handle error
      console.log('err', err);
    }
  };

  return (
    <Form<FormData>
      onSubmit={handleSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, submitError }) => (
        <form
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
            <Field name={fieldNames.first_name} validate={isRequired('First name')}>
              {({ input, meta }) => (
                <FormInput
                  error={meta.touched && meta.error ? (meta.error as string) : undefined}
                  inputProps={{
                    ...input,
                    placeholder: firstNameInput.placeHolder,
                    autoComplete: 'given-name',
                  }}
                  label={firstNameInput.label}
                  type={firstNameInput.type}
                />
              )}
            </Field>
            <Field name={fieldNames.last_name} validate={isRequired('Last name')}>
              {({ input, meta }) => (
                <FormInput
                  error={meta.touched && meta.error ? (meta.error as string) : undefined}
                  inputProps={{
                    ...input,
                    placeholder: lastNameInput.placeHolder,
                    autoComplete: 'family-name',
                  }}
                  label={lastNameInput.label}
                  type={lastNameInput.type}
                />
              )}
            </Field>
          </div>
          <Field name={fieldNames.email} validate={composeValidators(isRequired('Email'), isEmail)}>
            {({ input, meta }) => (
              <FormInput
                error={meta.touched && meta.error ? (meta.error as string) : undefined}
                inputProps={{
                  ...input,
                  placeholder: emailInput.placeHolder,
                  autoComplete: 'email',
                }}
                label={emailInput.label}
                type={emailInput.type}
              />
            )}
          </Field>
          <Field name={fieldNames.text} validate={isRequired('Message')}>
            {({ input, meta }) => (
              <TextArea
                error={meta.touched && meta.error ? (meta.error as string) : undefined}
                textareaProps={{
                  ...input,
                  placeholder: messageInput.placeHolder,
                }}
                label={messageInput.label}
              />
            )}
          </Field>

          <Field name={fieldNames.isAgreePrivacy} type="checkbox" validate={isRequired('Privacy policy')}>
            {({ input, meta }) => (
              <LinkWithCheckbox
                inputProps={{ ...input }}
                error={meta.touched && meta.error ? (meta.error as string) : undefined}
                text={privacyCheckbox.text}
                linkText={privacyCheckbox.linkText}
                linkHref={privacyCheckbox.linkHref}
                color="gray"
                type="primary"
              />
            )}
          </Field>

          <FormSpy<FormData> subscription={{ hasValidationErrors: true }}>
            {({ hasValidationErrors }: { hasValidationErrors: boolean }) => (
              <Button
                size="lg"
                color="primary"
                type="submit"
                disabled={submitting || hasValidationErrors}
                content={buttonText}
              />
            )}
          </FormSpy>
          {submitError && <FieldError error={submitError as string} />}
          <NotifyMessage text={successMessage} isShow={isSuccessSend} trigger={setIsSuccessSend} />
        </form>
      )}
    />
  );
}
