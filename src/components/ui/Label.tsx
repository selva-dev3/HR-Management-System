import React, { LabelHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  isRequired?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, isRequired = false, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('mb-1.5 block text-sm font-medium text-text', className)}
        {...props}
      >
        {children}
        {isRequired && <span className="ml-0.5 text-error">*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';
