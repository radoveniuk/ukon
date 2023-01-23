import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import TextField from './TextField';

import 'react-datepicker/dist/react-datepicker.css';
// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

type Props = {
  label: string;
  placeholder?: string;
  value: Date | null;
  onChange(v: Date | null): void;
};

export default function DatePicker ({ label, placeholder = 'DD.MM.YYYY', value, onChange }: Props) {
  return (
    <ReactDatePicker placeholderText={placeholder} selected={value} onChange={onChange} dateFormat="dd.MM.yyyy" customInput={<TextField label={label} />} />
  );
};