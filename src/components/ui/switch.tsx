import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    checkedLabel?: string;
    uncheckedLabel?: string;
  }
>(({ className, checkedLabel, uncheckedLabel, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer group relative inline-flex h-7 w-[120px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      className
    )}
    {...props}
    ref={ref}
  >
    {checkedLabel && (
      <span className='absolute left-4 text-xs font-medium text-white opacity-0 transition-opacity group-data-[state=checked]:opacity-100'>
        {checkedLabel}
      </span>
    )}
    {uncheckedLabel && (
      <span className='absolute right-4 text-xs font-medium text-gray-300 opacity-100 transition-opacity group-data-[state=checked]:opacity-0'>
        {uncheckedLabel}
      </span>
    )}
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-6 w-6 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[90px] data-[state=unchecked]:translate-x-0.5'
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
