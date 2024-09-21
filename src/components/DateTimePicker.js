import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function BasicDateTimePicker({ dateTimeValue, setDateTimeValue }) {
  const handleDateTimeChange = (val) => {
    setDateTimeValue(val)
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          value={dateTimeValue}
          label="Pick Date Time"
          onChange={handleDateTimeChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
