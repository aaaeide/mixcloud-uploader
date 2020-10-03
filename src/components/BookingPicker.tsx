import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { Booking } from '../api/types';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

interface BookingPickerProps {
  bookingList: Booking[];
  disabled: boolean;
}
const BookingPicker: React.FC<BookingPickerProps> = ({
  bookingList,
  disabled,
}) => {
  return (
    <Autocomplete
      disabled={disabled}
      multiple
      id='checkboxes-tags-demo'
      options={bookingList}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(option, { selected }) => {
        const startTimeString =
          `${option.startTime.getHours().toString().padStart(2, '0')}:` +
          `${option.startTime.getMinutes().toString().padStart(2, '0')}`;

        const endTimeString =
          `${option.endTime.getHours().toString().padStart(2, '0')}:` +
          `${option.endTime.getMinutes().toString().padStart(2, '0')}`;

        return (
          <>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {`${startTimeString}-${endTimeString}\t${option.title}`}
          </>
        );
      }}
      renderInput={(params) => (
        <TextField
          // Kokt fra material-ui: https://material-ui.com/components/autocomplete/#CheckboxesTags.tsx
          // Ikke spør meg hva params består av men det funker
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          variant='outlined'
          label={disabled ? 'Velg dato' : 'Velg studiobookinger'}
        />
      )}
    />
  );
};

export default BookingPicker;
