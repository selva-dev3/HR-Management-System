import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { EmptyState } from '@/components/ui/EmptyState';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T, index: number) => React.ReactNode);
  className?: string;
};

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  rowClassName?: string;
  className?: string;
}

export function DataTable<T extends { id?: string }>({
  columns,
  data,
  isLoading = false,
  emptyTitle,
  emptyDescription,
  rowClassName,
  className,
}: DataTableProps<T>): React.ReactElement {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(data.length / pageSize) || 1;
  const sliced = data.slice((page - 1) * pageSize, page * pageSize);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle || 'No records found'} description={emptyDescription} />;
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-surface-raised text-text-muted">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={cn('px-4 py-3 font-medium', col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface">
            {sliced.map((row, rowIdx) => (
              <tr key={row.id ?? rowIdx} className={cn('hover:bg-surface-raised', rowClassName)}>
                  {columns.map((col, colIdx) => {
                    const cell = typeof col.accessor === 'function' ? col.accessor(row, rowIdx) : (row[col.accessor] as React.ReactNode);
                    return (
                      <td key={colIdx} className={cn('whitespace-nowrap px-4 py-3 text-text', col.className)}>
                        {cell}
                      </td>
                    );
                  })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length > pageSize && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-text-muted">
            Showing {Math.min((page - 1) * pageSize + 1, data.length)} – {Math.min(page * pageSize, data.length)} of {data.length}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-text-muted">
              Page {page} of {totalPages}
            </span>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
