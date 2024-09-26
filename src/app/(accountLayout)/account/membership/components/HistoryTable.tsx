import type { ColumnDef } from '@tanstack/react-table';

import { CheckIcon, LinkBrokenIcon, LoadingIcon, SlashCircle01 } from '@/assets/icons';
import { Badge, Table } from '@/lib/components';
import type { TableRow } from '@/lib/components/Table/Table';
import type { BillingHistory, Plan } from '@/types';
import { capitalizeFirstLetter } from '@/utils/string';

interface Props {
  data: BillingHistory;
}

const planNames: Record<Plan, string> = {
  test: 'Test',
  genesis: 'Genesis',
  'genesis-plus': 'Genesis +',
  basic: '',
} as const;

export function HistoryTable({ data }: Props) {
  const tableData = data.map((item) => ({
    invoice: `${planNames[item.subscription.plan] || item.subscription.plan} Plan – ${item.createdAt.toLocaleDateString(
      'en-US',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    )}`,
    amount:
      item.type === 'crypto'
        ? `${item.amount.toLocaleString('en-US')} USDC`
        : `$${item.amount.toLocaleString('en-US')}`,
    date: item.createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    status: item.status,
  }));

  const columns: ColumnDef<TableRow, string>[] = [
    {
      accessorKey: 'invoice',
      header: 'Invoice',
      cell: (info) => <div className="text-sm font-medium text-gray-900">{info.getValue()}</div>,
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        if (info.getValue() === 'paid') {
          return (
            <div className="flex justify-start">
              <Badge icon={<CheckIcon />} size="sm" color="success" content={capitalizeFirstLetter(info.getValue())} />
            </div>
          );
        }

        if (info.getValue() === 'open') {
          return (
            <div className="flex justify-start">
              <Badge icon={<LoadingIcon />} size="sm" color="blue" content={capitalizeFirstLetter(info.getValue())} />
            </div>
          );
        }

        if (info.getValue() === 'cancelled') {
          return (
            <div className="flex justify-start">
              <Badge
                icon={
                  <div className="text-error-500">
                    <SlashCircle01 />
                  </div>
                }
                size="sm"
                color="error"
                content={capitalizeFirstLetter(info.getValue())}
              />
            </div>
          );
        }

        if (info.getValue() === 'incompleted') {
          return (
            <div className="flex justify-start">
              <Badge
                icon={<LinkBrokenIcon />}
                size="sm"
                color="gray-blue"
                content={capitalizeFirstLetter(info.getValue())}
              />
            </div>
          );
        }
      },
    },
  ];

  return <Table tableData={tableData} columns={columns} />;
}
