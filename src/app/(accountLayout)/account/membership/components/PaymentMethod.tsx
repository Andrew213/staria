import cn from 'classnames';
import { useCallback, useState } from 'react';

import { userApi } from '@/api/UserApi';
import { useMembership } from '@/core/providers/MembershipProvider';
import { Button, Checkbox, Link } from '@/lib/components';

import { data } from '../constants';

export function PaymentMethod() {
  const { setPaymentStep, checkedPlan } = useMembership();
  const [checkedProvider, setCheckedProvider] = useState<string>('stripe');

  const onCheckout = useCallback(async () => {
    const response = await userApi.getPaymentLink(checkedPlan, checkedProvider);
    if (response?.url) {
      window.location.href = response?.url;
    }
  }, [checkedProvider, checkedPlan]);

  return (
    <div>
      <h2 className="pb-1 text-lg font-semibold text-gray-900 lg:pt-2 lg:text-display-xs">
        {data.upgradePlan.paymentMethod.title}
      </h2>
      <p className="font-rubik text-sm text-gray-600 lg:text-md">{data.upgradePlan.paymentMethod.description}</p>

      <div className="mt-5 flex flex-col gap-3">
        {data.upgradePlan.paymentMethod.items.map((paymentItem) => (
          <div
            key={paymentItem.id}
            onClick={() => setCheckedProvider(paymentItem.id)}
            className={cn('overflow-hidden rounded-3 p-4', {
              'border border-gray-200 bg-white': !(checkedProvider === paymentItem.id),
              'border border-primary-600 bg-primary-50 shadow-1 shadow-primary-600': checkedProvider === paymentItem.id,
            })}
          >
            <div className={cn('flex items-start justify-between gap-1')}>
              <div className="grow">
                <div className="flex gap-3">
                  <div className="flex h-8 w-11.5 items-center justify-center rounded border border-gray-100 bg-white">
                    {paymentItem.icon}
                  </div>

                  <div>
                    <p
                      className={cn('text-sm font-medium', {
                        'text-gray-700': !(checkedProvider === paymentItem.id),
                        'text-primary-800': checkedProvider === paymentItem.id,
                      })}
                    >
                      {paymentItem.title}
                    </p>
                    <p
                      className={cn('mb-1 font-rubik text-sm', {
                        'text-gray-600': !(checkedProvider === paymentItem.id),
                        'text-primary-600': checkedProvider === paymentItem.id,
                      })}
                    >
                      {paymentItem.description}
                    </p>
                    <div
                      className={cn({
                        '[&>a:hover]:text-primary-500 [&>a]:text-primary-500': checkedProvider === paymentItem.id,
                      })}
                    >
                      <Link
                        target="_blank"
                        content={paymentItem.linkText}
                        size="sm"
                        color="gray"
                        href={paymentItem.link}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="[&>label]:p-0">
                <Checkbox
                  size="md"
                  variant="rounded"
                  inputProps={{
                    checked: checkedProvider === paymentItem.id,
                    onChange: () => setCheckedProvider(paymentItem.id),
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-stretch gap-3 pt-6 lg:grid lg:grid-cols-[250px_250px] lg:justify-end">
        <Button
          onClick={() => {
            void onCheckout();
          }}
          size="lg"
          color="primary"
          content={data.upgradePlan.paymentMethod.checkout}
        />
        <Button
          className="lg:-order-1"
          size="lg"
          color="secondary-gray"
          content={data.upgradePlan.paymentMethod.cancel}
          onClick={() => setPaymentStep(null)}
        />
      </div>
    </div>
  );
}
