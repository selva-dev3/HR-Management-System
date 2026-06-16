import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ open, onClose, title, description, children, footer, size = 'md' }: ModalProps): React.ReactElement | null {
  if (!open) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div
        className={cn(
          'relative w-full rounded-lg bg-surface shadow-dropdown',
          sizes[size]
        )}
      >
        {(title || description) && (
          <div className="border-b border-border px-6 py-4">
            {title && <h3 className="text-lg font-semibold text-text">{title}</h3>}
            {description && <p className="mt-1 text-sm text-text-muted">{description}</p>}
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
        {footer && <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
