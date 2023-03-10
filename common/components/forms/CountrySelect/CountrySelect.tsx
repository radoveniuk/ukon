import { ForwardedRef, forwardRef } from 'react';
import Image from 'next/image';

import SearchSelect from '../SearchSelect';

import data from './data.json';

export type CountrySelectProps = {
  value: any | null;
  onChange(value: any): void;
  label?: string;
  placeholder?: string;
  className?: string;
  onBlur?(e: any): void;
  state?: 'draft' | 'error' | 'success';
};

const CountrySelect = forwardRef((props: CountrySelectProps, ref: ForwardedRef<HTMLInputElement>) => {
  const flagImg = (countryCode: string) => {
    let sizes = countryCode.toLowerCase() !== 'ch' ? { width: 28, height: 14 } : { width: 14, height: 14 };
    return <Image {...sizes} alt={countryCode} src={`https://flagcdn.com/w320/${countryCode?.toLowerCase()}.png`} style={{ marginRight: 10 }} />;
  };
  return (
    <SearchSelect
      {...props}
      pathToLabel="ru"
      ref={ref}
      options={data}
      customRenderMenuItem={(item) => <div style={{ display: 'flex', alignItems: 'center' }}>{flagImg(item.CountryCode)}{item.ru}</div>}
      valuePrefix={(item) => !!item && flagImg(item.CountryCode)}
    />
  );
});

CountrySelect.displayName = 'CountrySelect';

export default CountrySelect;