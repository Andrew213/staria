import cn from 'classnames';
import React from 'react';
import Markdown from 'react-markdown';

import { Badge, QuestionMarkTooltip, Button, DiscountSticker } from '@/lib/components';
import type { Color } from '@/lib/components/Button/Button';
import type { Plan } from '@/types';

import { TableCell } from './TableCell';
import type { PlanData, RowData } from '../constants';

interface Props {
  planData: PlanData[];
  tableRows: RowData[];
  isReferral?: boolean;
  getButtonProps?: (planId: Plan) => { content: string; color: Color; disabled?: boolean };
  onButtonClick?: (planId: Plan) => void;
  showDiscountSticker?: boolean;
}

export function MobileTable({
  planData,
  tableRows,
  isReferral,
  getButtonProps,
  onButtonClick,
  showDiscountSticker,
}: Props) {
  return (
    <div className={cn('flex flex-col gap-8', { '!p-0': isReferral })}>
      {planData.map((item, index) => {
        const isFirstCol = index === 0;
        const isSecondCol = index === 1;
        const buttonProps = getButtonProps?.(item.id);
        const cellName = isFirstCol ? 'basic' : isSecondCol ? 'genesis' : 'genesisPlus';

        return (
          <div
            key={`${item.title}${index}-xs`}
            className={cn('rounded-4 border border-gray-200 shadow-section-card-2', {
              'mt-15 rounded-t-none': !isFirstCol,
            })}
          >
            <div className={cn('', isFirstCol && '')}>
              <div className="flex flex-col">
                <div className={cn('relative flex flex-col pb-8 pt-8')}>
                  {item.topTitle && (
                    <div
                      className={cn(
                        `absolute -top-15 left-0 right-0 ${item.topTitle.color} px-2 py-4 text-center text-lg font-bold uppercase text-white`,
                        { 'rounded-t-4': !isFirstCol },
                      )}
                    >
                      {item.topTitle.text}
                    </div>
                  )}
                  <div
                    className={cn('flex items-center justify-between gap-2 px-4', {
                      'pb-8': !isFirstCol,
                      'pb-5': isFirstCol,
                    })}
                  >
                    <h3 className="text-display-xs text-gray-600">{item.title}</h3>
                    {item.badge && <Badge size="xs" color={item.badge.color} content={item.badge.text} />}
                  </div>
                  <div className="relative flex flex-col gap-4 px-4">
                    {showDiscountSticker && !isFirstCol && (
                      <div className="absolute -top-7 left-4">
                        <DiscountSticker variant="pill" size="xs" />
                      </div>
                    )}
                    <div
                      className={cn('flex gap-2', {
                        'items-end': !item.periodCrossed,
                        'items-center': !!item.periodCrossed,
                      })}
                    >
                      <p className="text-nowrap text-display-lg font-semibold tracking-tight text-gray-900">
                        $ {item.price}
                      </p>
                      <div
                        className={cn({
                          '-mt-5': !!item.periodCrossed,
                          'mb-2': !item.periodCrossed,
                        })}
                      >
                        <div className="mb-1 text-xl font-semibold text-gray-900/67 line-through">
                          {item.periodCrossed}
                        </div>
                        <p className="text-nowrap text-display-xs font-semibold text-gray-900">{item.period}</p>
                      </div>
                    </div>
                    <div className="mb-2 font-rubik text-md text-gray-600">
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
                      <div className="[&>button:disabled]:border-gray-300 [&>button:disabled]:bg-white [&>button:disabled]:text-gray-700">
                        <Button
                          disabled={buttonProps?.disabled}
                          color={buttonProps?.color ?? 'primary'}
                          size="xl"
                          content={buttonProps?.content ?? item.buttonText}
                          className="mt-6 w-full"
                          onClick={() => {
                            onButtonClick?.(item.id);
                          }}
                          animate
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <table
                border={0}
                cellSpacing="0"
                cellPadding="0"
                className="w-full table-fixed border-collapse border-spacing-0"
              >
                <tbody>
                  {tableRows.map((x, index) => (
                    <React.Fragment key={`${x.rowTitle}${index}-xs`}>
                      <tr>
                        <td
                          className={cn(
                            'text-nowrap px-4 pb-4 pt-8 text-sm font-semibold text-primary-700 xl:px-6 xl:pt-10',
                            {
                              '!pt-0': index === 0,
                            },
                          )}
                        >
                          {x.rowTitle}
                        </td>
                        <td></td>
                      </tr>
                      {x.items
                        .filter(
                          (x) =>
                            (x.showOnMobile && x[cellName] !== null) ??
                            (x.hideOnMobile && !!x[cellName]) ??
                            (!x.showOnMobile && !x.hideOnMobile),
                        )
                        .map((rawCell, index) => {
                          const cell = rawCell as {
                            title: string;
                            description: string;
                            basic: string | boolean;
                            genesis: string | boolean;
                            genesisPlus: string | boolean;
                          };

                          return (
                            <tr key={`${cell.title}${index}-xs`} className={cn('')}>
                              <td className="text-sm font-medium text-gray-900">
                                <div
                                  className={cn('flex flex-col items-start py-5 pl-12', {
                                    'bg-gray-50': index % 2 === 0,
                                  })}
                                >
                                  <div className="flex w-[200px] items-center gap-3 text-nowrap lg:gap-1">
                                    {cell.title}
                                    <QuestionMarkTooltip
                                      small
                                      id={cell.title}
                                      position="top"
                                      color="secondary"
                                      title={cell.description}
                                    />
                                  </div>
                                </div>
                              </td>
                              <TableCell data={cell[cellName]} index={index} />
                            </tr>
                          );
                        })}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
