import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

import { fetchBookingList, Booking, Studio } from '../api';

import Navbar from '../components/Navbar';
import DatePicker from '../components/DatePicker';
import StudioPicker from '../components/StudioPicker';
import BookingPicker from '../components/BookingPicker';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedStudio, setSelectedStudio] = useState<Studio>(Studio.Studio1);
  const [currentBookingList, setCurrentBookingList] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedBookings, setSelectedBookings] = useState<Booking[]>([]);

  /**
   * Fetch booking list whenever selectedDate changes.
   */
  useEffect(() => {
    if (selectedDate !== null) {
      setIsLoading(true);

      fetchBookingList(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1, // getMonth() returns 0-indexed month number
        selectedDate.getDate(),
        selectedStudio,
      )
        .then((bookingList) => setCurrentBookingList(bookingList))
        .then(() => setIsLoading(false));
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
        <DatePicker value={selectedDate} setValue={setSelectedDate} />
      </Grid>
      <Grid container justify='center' alignItems='center' xs={6}>
        <StudioPicker
          selectedStudio={selectedStudio}
          selectStudio={setSelectedStudio}
        />
      </Grid>
      <Grid item xs={12}>
        <BookingPicker
          bookingList={currentBookingList}
          disabled={isLoading || selectedDate === null}
          setSelectedBookings={setSelectedBookings}
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
