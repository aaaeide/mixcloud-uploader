import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { fetchBookingList, Booking, Studio } from '../api';

import DatePicker from '../components/DatePicker';
import BookingPicker from '../components/BookingPicker';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentBookingList, setCurrentBookingList] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedDate !== null) {
      setIsLoading(true);

      fetchBookingList(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1, // getMonth() returns 0-indexed month number
        selectedDate.getDate(),
        Studio.Studio1,
      )
        .then((bookingList) => setCurrentBookingList(bookingList))
        .then(() => setIsLoading(false));
    }
  }, [selectedDate]);

  return (
    <Grid container justify='space-around'>
      <DatePicker value={selectedDate} setValue={setSelectedDate} />
      <BookingPicker
        bookingList={currentBookingList}
        disabled={isLoading || selectedDate === null}
      />
    </Grid>
  );
};

export default App;
