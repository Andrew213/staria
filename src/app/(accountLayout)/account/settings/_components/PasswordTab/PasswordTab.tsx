import type { AxiosError } from 'axios';
import classNames from 'classnames';
import type { FormApi } from 'final-form';
import type { ChangeEvent, MutableRefObject } from 'react';
import { useRef } from 'react';
import type { FieldInputProps } from 'react-final-form';
import { Field, Form, FormSpy } from 'react-final-form';
import { toast } from 'react-toastify';

import { userApi } from '@/api/UserApi';
import { Toaster } from '@/app/_components';
import { Button, FormInput } from '@/lib/components';
import { composeValidators, isRequired, isValidPassword } from '@/utils';

import { data } from './constants';

interface FormData {
  currentPassword: string;
  password: string;
  repeatPassword: string;
}

export function PasswortTab() {
  const handleSubmit = async (values: FormData, form: FormApi<FormData, Partial<FormData>>) => {
    try {
      await userApi.setNewPassword({ oldPassword: values.currentPassword, newPassword: values.repeatPassword });
      toast(<Toaster type="success" text={data.textSuccess} />);
      form.restart();
    } catch (err) {
      const error = err as AxiosError;
      if (error.message === 'Unauthorized') {
        toast(<Toaster type="error" text={data.textError} />);
      }
    }
  };

  const formRef: MutableRefObject<FormApi<FormData, Partial<FormData>> | null> = useRef(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, input: FieldInputProps<unknown, HTMLElement>) => {
    input.onChange(e.target.value.trim());
  };

  return (
    <>
      <h2 className="mb-1 text-lg font-semibold text-gray-900">{data.title}</h2>
      <p className="mb-5 font-rubik text-sm font-normal text-gray-600">{data.subtitle}</p>
      <Form<FormData>
        onSubmit={handleSubmit}
        validate={(values: FormData) => {
          const errors = {} as Record<keyof FormData, string | undefined>;
          if (values.password !== values.repeatPassword) {
            errors.repeatPassword = 'Repeat password is incorrect';
          }
          return errors;
        }}
        render={({ handleSubmit, submitting, form }) => {
          formRef.current = form;
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void handleSubmit();
              }}
            >
              {data.fields.map((el, index) => {
                let validation = composeValidators(isRequired('Field'));
                if (el.type === 'password') {
                  validation = composeValidators(isRequired('Field'), isValidPassword);
                }
                return (
                  <Field name={el.type} key={index} validate={validation}>
                    {({ input, meta }) => {
                      return (
                        <div
                          className={classNames(
                            'align flex flex-col gap-1.5 border-gray-200 py-5 lg:flex-row lg:gap-8',
                            {
                              'border-y': index % 2 === 0,
                            },
                          )}
                        >
                          <p className="w-full max-w-70 font-ruberoid text-sm font-medium text-gray-700 lg:font-semibold">
                            {el.label}
                          </p>

                          <div className="w-full lg:max-w-[512px]">
                            <FormInput
                              error={
                                (meta.touched as unknown as string) && (meta.error as string) && (meta.error as string)
                              }
                              inputProps={{
                                ...input,
                                onChange: (e) => handleInputChange(e, input),
                              }}
                              type="password"
                            />

                            {el.notification && (
                              <p className="mt-1.5 font-rubik text-sm font-normal text-gray-600">{el.notification}</p>
                            )}
                          </div>
                        </div>
                      );
                    }}
                  </Field>
                );
              })}
              <FormSpy subscription={{ hasValidationErrors: true }}>
                {({ hasValidationErrors }) => {
                  return (
                    <div className="mt-4 flex max-w-[1096px] justify-end gap-3">
                      <Button
                        onClick={() => formRef.current?.restart()}
                        size="md"
                        type="button"
                        color="secondary-gray"
                        content={data.cancelButtonText}
                      />
                      <Button
                        size="md"
                        type="submit"
                        loading={submitting}
                        className="w-[160px]"
                        disabled={hasValidationErrors}
                        color="primary"
                        content={data.okButtonText}
                      />
                    </div>
                  );
                }}
              </FormSpy>
            </form>
          );
        }}
      />
    </>
  );
}
