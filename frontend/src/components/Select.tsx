import * as RadixSelect from '@radix-ui/react-select';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
}

export function Select({ value, onValueChange, options, className = '' }: SelectProps) {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger
        className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 bg-white transition-shadow duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent data-placeholder:text-slate-400 ${className}`}
      >
        <RadixSelect.Value />
        <RadixSelect.Icon>
          <svg className="size-4 text-slate-500" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={4}
          className="z-50 w-(--radix-select-trigger-width) rounded-lg border border-slate-200 bg-white shadow-lg overflow-hidden"
        >
          <RadixSelect.Viewport className="p-1">
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-md text-sm text-slate-900 cursor-pointer select-none outline-none transition-colors duration-100 data-highlighted:bg-indigo-50 data-highlighted:text-indigo-700 data-[state=checked]:font-medium"
              >
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator>
                  <svg className="size-4 text-indigo-600" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M4 10.5L8 14.5L16 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
