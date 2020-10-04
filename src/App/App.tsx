import React, { useReducer, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

import { fetchBookingList, Booking, Studio } from '../api';

import {
  reducer,
  initialState,
  selectDate,
  selectStudio,
  setCurrentBookingList,
  setBookingListLoading,
  setSelectedBookings,
} from '../state';

import Navbar from '../components/Navbar';
import DatePicker from '../components/DatePicker';
import StudioPicker from '../components/StudioPicker';
import BookingPicker from '../components/BookingPicker';

const App: React.FC = () => {
  const [
    {
      selectedDate,
      selectedStudio,
      currentBookingList,
      bookingListLoading,
      selectedBookings,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

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
  }, [selectedDate, selectedStudio]);

  console.log('CURRENTLY SELECTED BOOKINGS', selectedBookings);

  return (
    <Grid container spacing={6}>
      <Grid container justify='center' alignItems='center'>
        <Navbar />
        <Toolbar />
      </Grid>
      <Grid container justify='center' alignItems='center' xs={6}>
        <DatePicker
          value={selectedDate}
          setValue={(d: Date | null) => dispatch(selectDate(d))}
        />
      </Grid>
      <Grid container justify='center' alignItems='center' xs={6}>
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
      <Grid container justify='center' alignItems='center'>
        <Button variant='contained' color='secondary'>
          Generer tracklist
        </Button>
      </Grid>
    </Grid>
  );
};

export default App;
