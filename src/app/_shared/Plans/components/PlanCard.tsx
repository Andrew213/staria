'use client';

import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Markdown from 'react-markdown';

import { CheckboxIcon, CrossRoundedIcon } from '@/assets/icons';
import { useMembership } from '@/core/providers/MembershipProvider';
import { Badge, Button, QuestionMarkTooltip, DiscountSticker } from '@/lib/components';
import { useAppSelector } from '@/redux/hooks';
import { selectActiveSubscription } from '@/redux/userSlice';
import { routes } from '@/routes';

import { plansData } from '../constants';
import type { Plan } from '../types';

type Props = Plan & { showDiscountSticker?: boolean };

export function PlanCard(props: Props) {
  const router = useRouter();
  const {
    showDiscountSticker,
    title,
    topTitle,
    badge,
    price,
    period,
    periodCrossed,
    description,
    features,
    buttonText,
  } = props;
  const session = useSession();
  const { setCheckedPlan, setPaymentStep } = useMembership();
  const activePlan = useAppSelector(selectActiveSubscription);

  function handleButtonClick() {
    const userIsAuthenticated = session.status === 'authenticated';

    if (userIsAuthenticated) {
      setCheckedPlan(props.id);
      setPaymentStep(
        (activePlan === 'basic' && (props.id === 'genesis' || props.id === 'genesis-plus')) ||
          (activePlan === 'genesis' && props.id === 'genesis-plus')
          ? 1
          : null,
      );
    }

    router.push(
      userIsAuthenticated
        ? routes.account.membership.getRedirectPath()
        : `${routes.signup.getRedirectPath()}?redirect=membership`,
    );
  }

  return (
    <div
      className={cn(
        'max-w-[384px] rounded-4 border border-gray-200 bg-white shadow-card transition duration-300 hover:scale-105',
        {
          'lg:mt-[60px]': !topTitle,
        },
      )}
    >
      {topTitle && (
        <div
          className={cn(
            topTitle.color,
            'relative rounded-t-4 px-2 py-4 text-center text-lg font-bold uppercase text-white',
          )}
        >
          {topTitle.text}
          {showDiscountSticker && (
            <div className="absolute right-0 top-0 -translate-y-1/2 lg:-right-5 lg:top-[-26px] lg:translate-y-0">
              <DiscountSticker />
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col gap-8 border-b border-gray-200 px-6 pb-8 pt-6 lg:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-display-xs text-gray-600">{title}</h3>
            {badge && <Badge size="lg" color={badge.color} content={badge.text} />}
          </div>
          <div
            className={cn('flex gap-1', {
              'items-end': !periodCrossed,
              'items-center': !!periodCrossed,
            })}
          >
            <p className="text-nowrap text-display-lg tracking-tight text-gray-900 lg:text-display-xl">$ {price}</p>
            <div
              className={cn({
                'mt-1': !!periodCrossed,
                '-mb-1': !periodCrossed,
              })}
            >
              <div className="mb-1 text-lg font-medium text-gray-900/67 line-through">{periodCrossed}</div>
              <p className="text-nowrap pb-2 text-display-xs text-gray-900">{period}</p>
            </div>
          </div>
          <div className="font-rubik text-md text-gray-600">
            <Markdown
              className="text-md text-gray-600"
              components={{
                strong: (props) => <span className="font-ruberoid font-bold text-gray-900">{props.children}</span>,
              }}
            >
              {description}
            </Markdown>
          </div>
          <Button className="mt-4" color="primary" size="lg" content={buttonText} onClick={handleButtonClick} />
        </div>
      </div>
      <div className="flex flex-col gap-6 px-6 pb-10 pt-8 lg:px-8">
        <div>
          <p className="text-md font-bold uppercase text-gray-900">{plansData.features}</p>
          {title === 'Basic' && (
            <p className="inline font-rubik text-md text-gray-600 xl:hidden">{plansData.featuresSubtitle}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {features.map(({ title: featureTitle, value, included, description }) => (
            <div key={`${featureTitle}${value}`} className="flex gap-2">
              {included ? <CheckboxIcon /> : <CrossRoundedIcon />}
              <div className="font-rubik text-md font-normal text-gray-600">
                <Markdown
                  components={{
                    strong: (props) => <span className="font-ruberoid font-bold">{props.children}</span>,
                  }}
                >
                  {featureTitle}
                </Markdown>
              </div>
              <QuestionMarkTooltip
                id={`feature-tooltip${title}${featureTitle}${value}`}
                position="bottom"
                text={description}
                color="secondary"
                className="ml-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
