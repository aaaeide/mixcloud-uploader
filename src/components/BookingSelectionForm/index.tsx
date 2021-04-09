import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Booking, Studio } from 'api';
import {
  ReducerState,
  ReducerActionsType,
  selectDate,
  selectStudio,
  setSelectedBookings,
} from 'state';

import BookingPicker from './BookingPicker';
import StudioPicker from './StudioPicker';
import DatePicker from './DatePicker';

interface BookingSelectionFormProps {
  state: ReducerState;
  dispatch: React.Dispatch<ReducerActionsType>;
  onSubmit: () => void;
}

const BookingSelectionForm: React.FC<BookingSelectionFormProps> = ({
  state,
  dispatch,
  onSubmit,
}) => {
  const {
    selectedDate,
    selectedStudio,
    currentBookingList,
    bookingListLoading,
  } = state;

  return (
    <Grid container spacing={6}>
      <Grid container item justify='center' alignItems='center' xs={6}>
        <DatePicker
          value={selectedDate}
          setValue={(d: Date | null) => dispatch(selectDate(d))}
        />
      </Grid>
      <Grid container item justify='center' alignItems='center' xs={6}>
        <StudioPicker
          selectedStudio={selectedStudio}
          selectStudio={(s: Studio) => dispatch(selectStudio(s))}
        />
      </Grid>
      <Grid item xs={12}>
        <BookingPicker
          bookingList={currentBookingList}
          disabled={bookingListLoading || selectedDate === null}
          setSelectedBookings={(bs: Booking[]) =>
            dispatch(setSelectedBookings(bs))
          }
        />
      </Grid>
      <Grid container item justify='center' alignItems='center'>
        <Button variant='contained' color='secondary' onClick={onSubmit}>
          Generer tracklist
        </Button>
      </Grid>
    </Grid>
  );
};

export default BookingSelectionForm;
