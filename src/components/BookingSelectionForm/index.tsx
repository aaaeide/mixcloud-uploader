import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Booking, Studio, fetchBookingList } from 'api';
import {
  ReducerState,
  ReducerActionsType,
  selectDate,
  selectStudio,
  setSelectedBookings,
  setBookingListLoading,
  setCurrentBookingList,
} from 'state';

import BookingPicker from './BookingPicker';
import StudioPicker from './StudioPicker';
import DatePicker from './DatePicker';

import { fetchDetailsAndGenerateTracklist } from './tracklistGeneration';

interface BookingSelectionFormProps {
  state: ReducerState;
  dispatch: React.Dispatch<ReducerActionsType>;
}

const BookingSelectionForm: React.FC<BookingSelectionFormProps> = ({
  state,
  dispatch,
}) => {
  const {
    selectedDate,
    selectedStudio,
    currentBookingList,
    bookingListLoading,
  } = state;

  /**
   * Fetch booking list whenever selectedDate changes.
   */
  useEffect(() => {
    if (selectedDate !== null) {
      dispatch(setBookingListLoading(true));

      fetchBookingList(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1, // getMonth() returns 0-indexed month number
        selectedDate.getDate(),
        selectedStudio,
      )
        .then((bookingList) => dispatch(setCurrentBookingList(bookingList)))
        .then(() => dispatch(setBookingListLoading(false)));
    }
    // Do not need dispatch as a dependency:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, selectedStudio]);

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
        <Button
          variant='contained'
          color='secondary'
          onClick={() =>
            fetchDetailsAndGenerateTracklist(dispatch, state.selectedBookings)
          }
        >
          Generer tracklist
        </Button>
      </Grid>
    </Grid>
  );
};

export default BookingSelectionForm;
