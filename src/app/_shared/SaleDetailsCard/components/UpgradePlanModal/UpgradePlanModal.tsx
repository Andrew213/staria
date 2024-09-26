import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Modal } from '@/app/_shared';
import { CoinsHandIcon } from '@/assets/icons';
import { useMembership } from '@/core/providers/MembershipProvider';
import { Button, Checkbox } from '@/lib/components';
import { routes } from '@/routes';

import { TEXTS } from './constants';
import { getPlans } from './utils';

interface Props {
  projectPhase: string;
  onClose: () => void;
}

export function UpgradePlanModal({ projectPhase, onClose }: Props) {
  const projectPhaseIsGuaranteed = projectPhase === 'guaranteed';
  const [selectedPlan, setSelectedPlan] = useState<'genesis' | 'genesis-plus'>(
    projectPhaseIsGuaranteed ? 'genesis-plus' : 'genesis',
  );
  const router = useRouter();
  const { setCheckedPlan, setPaymentStep } = useMembership();
  const plans = getPlans(projectPhase);
  const thereIsMoreThanOnePlanToUpgradeTo = plans.length > 1;

  return (
    <Modal onClose={onClose}>
      <div className="rounded-2.5 bg-white px-4 pb-4 pt-5 lg:max-w-120 lg:p-6">
        <div className="mb-3 inline-flex size-12 items-center justify-center rounded-2.5 border border-gray-200 shadow-[0_1px_2px_rgb(16_24_40/5%)] lg:mb-4">
          <CoinsHandIcon className="w-5 text-gray-700" />
        </div>
        <h2 className="mb-1 text-display-xs font-semibold text-gray-900">{TEXTS.title}</h2>
        <p className="mb-5 font-rubik text-sm text-gray-600">
          {projectPhaseIsGuaranteed ? TEXTS.guaranteedDescription : TEXTS.fcfsDescription}
        </p>
        <ul className="mb-6 space-y-3 lg:mb-8">
          {plans.map(({ id, title, description, Icon }) => {
            const selected = id === selectedPlan;

            return (
              <li
                className={cn(
                  'grid grid-cols-[32px_1fr] items-start gap-x-3.5 rounded-3',
                  selected ? 'border-2 border-primary-600 bg-primary-50 p-3.5' : 'border border-gray-200 p-3.75',
                )}
                key={id}
              >
                <div className="flex size-8 items-center justify-center rounded-full border-4 border-primary-50 bg-primary-100">
                  <Icon className="w-4 text-primary-600" />
                </div>
                <div
                  className={cn({
                    'grid grid-cols-[1fr_16px] items-start gap-x-1': thereIsMoreThanOnePlanToUpgradeTo,
                  })}
                >
                  <div>
                    <p className={cn('text-md font-semibold', selected ? 'text-primary-800' : 'text-gray-700')}>
                      {title}
                    </p>
                    <p className={cn('font-rubik text-sm', selected ? 'text-primary-700' : 'text-gray-600')}>
                      {description}{' '}
                      <Link className="text-primary-500" href={routes.pricing.getRedirectPath()}>
                        {TEXTS.link}
                      </Link>
                    </p>
                  </div>
                  {thereIsMoreThanOnePlanToUpgradeTo && (
                    <div className="[&>label]:py-0">
                      <Checkbox
                        variant="rounded"
                        inputProps={{
                          checked: selected,
                          onChange: () => {
                            if (!selected) {
                              setSelectedPlan(id);
                            }
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="max-lg:flex max-lg:flex-col-reverse max-lg:gap-y-3 lg:grid lg:grid-cols-2 lg:gap-x-3">
          <Button color="secondary-gray" size="lg" content={TEXTS.cancelButton} onClick={onClose} />
          <Button
            color="primary"
            size="lg"
            content={TEXTS.confirmButton}
            onClick={() => {
              setCheckedPlan(selectedPlan);
              setPaymentStep(1);
              router.push(routes.account.membership.getRedirectPath());
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
