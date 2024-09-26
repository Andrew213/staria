'use client';

import type { FormApi } from 'final-form';
import { FORM_ERROR, setIn } from 'final-form';
import { useState } from 'react';
import { Form, Field } from 'react-final-form';

import { subscribeApi } from '@/api/SubscribeApi';
import { Button, FieldError, FormInput, NotifyMessage } from '@/lib/components';
import type { FieldNames } from '@/types/common';
import { composeValidators, isEmail, isRequired } from '@/utils';

import { data } from '../constants';
interface FormData {
  email: string;
}

const fieldNames: FieldNames<FormData> = {
  email: 'email',
};

const initialValues: FormData = {
  email: '',
};

export function SubscribeForm() {
  const [isSuccessSend, setIsSuccessSend] = useState(false);

  const handleSubmit = async (values: FormData, form: FormApi<FormData, Partial<FormData>>) => {
    try {
      // TODO handle error more clear when BE will be completed
      let errors = {};
      const setError = (key: string, value: string) => {
        errors = setIn(errors, key, value);
      };

      const response = await subscribeApi.sendSubscribeRequest(values);

      if (response?.errors) {
        if (
          response.errors[0].context === 'Member already exists. Attempting to add member with existing email address'
        ) {
          setError(FORM_ERROR, 'This email is already subscribed.');
        } else {
          setError(FORM_ERROR, response.errors[0].context);
        }
      }

      if (Object.entries(errors).length > 0) {
        return errors;
      }

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
        >
          <div className="relative flex w-full flex-col justify-stretch gap-4 lg:flex-row lg:items-start [&>div]:shrink-0 [&>div]:grow">
            <Field name={fieldNames.email} validate={composeValidators(isRequired('Email'), isEmail)}>
              {({ input, meta }) => (
                <FormInput
                  error={meta.touched && meta.error ? (meta.error as string) : undefined}
                  inputProps={{
                    ...input,
                    placeholder: data.emailPlaceholder,
                    type: data.inputType,
                    autoComplete: 'email',
                  }}
                />
              )}
            </Field>
            <Button size="lg" color="primary" type="submit" disabled={submitting} content={data.buttonText} animate />
            <FieldError error={submitError as string} className="absolute -bottom-5 left-0" />
            <NotifyMessage
              text="Success!"
              isShow={isSuccessSend}
              trigger={setIsSuccessSend}
              className="absolute -bottom-5 left-0"
            />
          </div>
        </form>
      )}
    />
  );
}
