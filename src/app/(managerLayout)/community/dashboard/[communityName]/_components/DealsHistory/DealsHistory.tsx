'use client';

import type { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import { Badge, Table } from '@/lib/components';
import type { TableRow } from '@/lib/components/Table/Table';
import { toAmountIn$orString, toFormattedAmount } from '@/utils/amount';
import { dateDotsFormatter } from '@/utils/date';
import { capitalizeFirstLetter } from '@/utils/string';

import { TEXTS } from './data';
import mockedIcon from './mockedIcon.jpeg';

type Status = 'open' | 'upcoming' | 'closed';

interface DataType {
  name: string;
  icon: string;
  amount: number;
  date: number;
  status: Status;
  usersCount: number;
}

const mockedData: DataType[] = [
  {
    name: 'Catalog',
    icon: '',
    amount: 12350,
    date: 1725442167626,
    status: 'open',
    usersCount: 1230,
  },
  {
    name: 'Command+R',
    icon: '',
    amount: 350824,
    date: 1715442067626,
    status: 'upcoming',
    usersCount: 50634,
  },
  {
    name: 'Hourglass',
    icon: '',
    amount: 950623,
    date: 1615442067626,
    status: 'closed',
    usersCount: 350675,
  },
];

const getBadgeDotColor = (status: Status) => {
  switch (status) {
    case 'open': {
      return 'success';
    }

    case 'upcoming': {
      return 'blue-gray';
    }

    case 'closed': {
      return 'error';
    }
  }
};

export default function DealsHistory() {
  const tableData = mockedData.map((item) => ({
    name: `${item.name}`,
    amount: toAmountIn$orString(item.amount),
    date: dateDotsFormatter.format(item.date),
    status: item.status,
    participators: `${toFormattedAmount(item.usersCount)} ${item.usersCount === 1 ? 'user' : 'users'}`,
  }));

  const columns: ColumnDef<TableRow, string>[] = [
    {
      accessorKey: 'name',
      header: 'Deals name',
      cell: (info) => (
        <div className="flex items-center gap-3">
          <div className="relative size-10 overflow-hidden rounded-full">
            <Image src={mockedIcon.src} alt="" fill className="object-cover" />
          </div>
          {info.getValue()}
        </div>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount raised',
    },
    {
      accessorKey: 'date',
      header: 'Date of creation',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue() as Status;

        return (
          <div className="flex justify-start">
            <Badge
              variant="square"
              size="sm"
              color="gray-transparent"
              dot={getBadgeDotColor(status)}
              content={capitalizeFirstLetter(info.getValue())}
            />
          </div>
        );
      },
    },
    {
      accessorKey: 'participators',
      header: 'Participations',
    },
  ];

  return (
    <section className="mb-6">
      <h2 className="mb-6 text-lg font-semibold text-white">{TEXTS.title}</h2>
      <Table tableData={tableData} columns={columns} />
    </section>
  );
}
