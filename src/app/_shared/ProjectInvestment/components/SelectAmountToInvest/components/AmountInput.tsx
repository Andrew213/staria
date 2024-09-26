import { useRef, useState, useEffect } from 'react';
import type { FieldInputProps, FieldMetaState } from 'react-final-form';

import { CoinsStacked02, Edit03, UsdCoinIcon2 } from '@/assets/icons';
import { Button, FieldError } from '@/lib/components';
import { isString } from '@/types/common';

interface Props {
  input: FieldInputProps<string, HTMLElement>;
  meta: FieldMetaState<string>;
  disabled: boolean;
  platformFee: number;
}

const NON_DIGITS_OR_LEADING_ZEROS_REGEX = /^0+|[^0-9]/g;
const mockedBalance = BigInt(400);

export function AmountInput({ input, meta, disabled, platformFee }: Props) {
  const [value, setValue] = useState(input.value);
  const [isDisabled, setIsDisabled] = useState(disabled);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [textWidth, setTextWidth] = useState(0);
  const [inputWidth, setInputWidth] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(NON_DIGITS_OR_LEADING_ZEROS_REGEX, '');

    setValue(inputValue);
    input.onChange(inputValue);
  };

  const handleMaxClick = () => {
    const feeRate = platformFee / 100 + 1;
    const maxAmount = Number(mockedBalance) / feeRate;

    setValue(Math.ceil(maxAmount).toString());
    input.onChange(Math.ceil(maxAmount));
  };

  const handleEditClick = () => {
    setIsDisabled(false);
  };

  useEffect(() => {
    const calculateTextWidth = (text: string, font: string) => {
      if (!canvasRef.current) return 0;
      const context = canvasRef.current.getContext('2d');
      if (!context) return 0;
      context.font = font;
      return context.measureText(text).width;
    };

    if (inputRef.current) {
      const inputElement = inputRef.current;
      const computedStyle = window.getComputedStyle(inputElement);
      const font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;
      const width = calculateTextWidth(value, font);
      setTextWidth(width);
      setInputWidth(inputElement.offsetWidth);
    }
  }, [value]);

  return (
    <>
      <div className="flex items-stretch">
        <div className="relative flex w-full items-center overflow-hidden rounded-l-2 border border-r-0 border-gray-300 px-3.5 py-3.5 dark:border-gray-blue-300">
          <input
            {...input}
            className="w-full truncate bg-transparent pr-12 text-lg outline-none placeholder:font-rubik placeholder:text-lg placeholder:text-gray-500 lg:text-xl lg:placeholder:text-xl dark:text-gray-blue-25 dark:placeholder:text-gray-blue-300"
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Enter Amount"
            disabled={isDisabled}
          />
          <canvas ref={canvasRef} className="hidden" />
          {value && (
            <span
              className="pointer-events-none absolute top-2/4 -translate-y-2/4 transform font-rubik text-xs text-gray-800 dark:text-gray-blue-25"
              style={{
                left: Math.min(textWidth + 16, inputWidth),
              }}
            >
              USDC
            </span>
          )}
          <span className="absolute bottom-0 right-0 top-0 bg-white px-3.5 py-4 dark:bg-downriver">
            <UsdCoinIcon2 />
          </span>
        </div>
        <div className="z-10 [&>button]:h-full [&>button]:!rounded-l-none [&>button]:!text-gray-600 dark:[&>button]:!text-gray-blue-100">
          <Button
            className="dark:rounded-l-none dark:border dark:border-primary-200 dark:bg-primary-500"
            color="secondary-gray"
            size="xl"
            icon={isDisabled ? <Edit03 className="size-6" /> : <CoinsStacked02 className="size-5" />}
            content={isDisabled ? 'Edit' : 'Max'}
            type="button"
            onClick={isDisabled ? handleEditClick : handleMaxClick}
          />
        </div>
      </div>
      {isString(meta.error) && meta.touched && <FieldError error={meta.error} />}
    </>
  );
}
