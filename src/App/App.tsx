import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { fetchBookingList, Booking, Studio } from '../api';

import DatePicker from '../components/DatePicker';
import StudioPicker from '../components/StudioPicker';
import BookingPicker from '../components/BookingPicker';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedStudio, setSelectedStudio] = useState<Studio>(Studio.Studio1);
  const [currentBookingList, setCurrentBookingList] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return (
    <Grid container spacing={3}>
      <Grid container justify='center' alignItems='center' xs={6}>
        <DatePicker value={selectedDate} setValue={setSelectedDate} />
      </Grid>
      <Grid container justify='center' alignItems='center' xs={6}>
        <StudioPicker
          selectedStudio={selectedStudio}
          selectStudio={setSelectedStudio}
        />
      </Grid>
      <Grid item justify='center' xs={12}>
        <BookingPicker
          bookingList={currentBookingList}
          disabled={isLoading || selectedDate === null}
        />
      </Grid>
    </Grid>
  );
};

export default App;
