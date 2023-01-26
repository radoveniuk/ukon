import React from 'react';
import ReactDatePicker from 'react-datepicker';

import TextField from './TextField';

import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  label: string;
  placeholder?: string;
  value: Date | null;
  onChange(v: Date | null): void;
  min?: Date;
  className?: string;
};

export default function DatePicker ({ label, min, placeholder = 'DD.MM.YYYY', value, onChange, className }: Props) {
  return (
    <ReactDatePicker minDate={min} placeholderText={placeholder} selected={value} onChange={onChange} dateFormat="dd.MM.yyyy" customInput={<TextField label={label} className={className} />} />
  );
};