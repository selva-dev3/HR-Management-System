import { format as dateFnsFormat } from 'date-fns';

export function formatDate(date: string | Date | number, pattern = 'MMM d, yyyy'): string {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  if (Number.isNaN(d.getTime())) return '-';
  return dateFnsFormat(d, pattern);
}

export function formatDateTime(date: string | Date | number): string {
  return formatDate(date, "MMM d, yyyy 'at' h:mm a");
}
