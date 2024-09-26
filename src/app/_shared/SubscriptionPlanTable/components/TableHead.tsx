import cn from 'classnames';
import Markdown from 'react-markdown';

import { Button, Badge, DiscountSticker } from '@/lib/components';
import type { Color } from '@/lib/components/Button/Button';
import type { Plan } from '@/types';

import type { PlanData } from '../constants';

export function TableHead({
  data,
  isReferral,
  getButtonProps,
  onButtonClick,
  showDiscountSticker,
}: {
  data: PlanData[];
  isReferral?: boolean;
  getButtonProps?: (planId: Plan) => { content: string; color: Color; disabled?: boolean };
  onButtonClick?: (planId: Plan) => void;
  showDiscountSticker?: boolean;
}) {
  return (
    <>
      {data.map((item, index) => {
        const isFirstCol = index === 0;
        const isSecondCol = index === 1;
        const isLastCol = index === data.length - 1;

        const buttonProps = getButtonProps?.(item.id);

        return (
          <td key={`${item.title}${index}`}>
            <div className={cn('-mx-px border-r border-t border-gray-200', isFirstCol && 'rounded-tl-4 border-l')}>
              <div className="mb-16 flex flex-col xl:mb-0">
                <div className={cn('relative flex flex-col pb-8 pt-4 xl:gap-12 xl:pb-6 xl:pt-6')}>
                  {item.topTitle && (
                    <div
                      className={cn(
                        `absolute -top-15 left-0 right-0 ${item.topTitle.color} px-2 py-4 text-center text-lg font-bold uppercase text-white`,
                        {
                          'rounded-tr-4': isLastCol,
                          'rounded-tl-4': isSecondCol,
                        },
                      )}
                    >
                      {item.topTitle.text}
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-2 px-6 xl:border-b xl:border-gray-200 xl:pb-4">
                    <h3
                      className={cn('text-display-xs text-gray-600', {
                        'text-xl font-semibold !text-gray-800': isReferral,
                      })}
                    >
                      {item.title}
                    </h3>
                    {item.badge && <Badge size="xs" color={item.badge.color} content={item.badge.text} />}
                  </div>
                  <div className="relative flex flex-col gap-4 px-4 xl:px-6 [&>button:disabled]:border-gray-300 [&>button:disabled]:bg-white [&>button:disabled]:text-gray-700">
                    {showDiscountSticker && !isFirstCol && (
                      <div className="absolute -top-10 left-4">
                        <DiscountSticker variant="pill" size="xs" />
                      </div>
                    )}
                    <div className={cn('flex items-center gap-1')}>
                      <div
                        className={cn('text-nowrap text-display-lg font-semibold tracking-tight text-gray-900', {
                          'text-display-md': isReferral,
                        })}
                      >
                        $ {item.price}
                      </div>
                      <div
                        className={cn({
                          '-mt-5': !!item.periodCrossed,
                          'mb-2': !item.periodCrossed,
                          'relative !m-0': isReferral,
                        })}
                      >
                        <div
                          className={cn('mb-1 text-xl font-semibold text-gray-900/67 line-through', {
                            'absolute top-[-100%] !text-md': isReferral,
                          })}
                        >
                          {item.periodCrossed}
                        </div>
                        <p
                          className={cn('text-nowrap text-display-xs font-semibold text-gray-900', {
                            'text-lg': isReferral,
                          })}
                        >
                          {item.period}
                        </p>
                      </div>
                    </div>
                    <div className="mb-2 font-rubik text-md text-gray-600 xl:min-h-18">
                      <Markdown
                        className="text-md text-gray-600"
                        components={{
                          strong: ({ children }) => (
                            <span className="font-ruberoid font-bold text-gray-900">{children}</span>
                          ),
                        }}
                      >
                        {item.description}
                      </Markdown>
                    </div>
                    <Button
                      color={buttonProps?.color ?? 'primary'}
                      size="xl"
                      content={buttonProps?.content ?? item.buttonText}
                      className="mt-2"
                      onClick={() => {
                        onButtonClick?.(item.id);
                      }}
                      disabled={buttonProps?.disabled}
                    />
                  </div>
                </div>
              </div>
            </div>
          </td>
        );
      })}
    </>
  );
}
