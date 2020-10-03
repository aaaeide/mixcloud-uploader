import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface DatePickerProps {
  value: Date | null;
  setValue: (d: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, setValue }) => {
  const handleDateChange = (date: MaterialUiPickersDate): void => {
    if (date === null) {
      setValue(null);
      return;
    }

    setValue(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant='inline'
        format='yyyy-MM-dd'
        margin='normal'
        id='date-picker-inline'
        label='Velg dato'
        value={value}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
