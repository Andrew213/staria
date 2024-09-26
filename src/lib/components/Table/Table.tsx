import type { ColumnDef } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

export type TableRow = Record<string, string>;

interface Props {
  tableData: TableRow[];
  columns: ColumnDef<TableRow, string>[];
}

export function Table({ tableData, columns }: Props) {
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative -mr-4 overflow-x-auto leading-[0] lg:mr-0">
      <div className="inline-block min-w-full overflow-hidden rounded-3 border border-gray-200 shadow-btn-primary dark:border-gray-blue-300">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-blue-500">
          <thead className="bg-gray-50 dark:bg-downriver">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-blue-100"
                    key={header.id}
                  >
                    {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-blue-500 dark:bg-downriver">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="whitespace-nowrap px-6 py-5 text-sm text-gray-500 dark:font-medium dark:text-white"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
