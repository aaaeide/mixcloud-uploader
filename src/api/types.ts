/* Booking type used internally */
export interface Booking {
  startTime: Date;
  endTime: Date;
  title: string;
  id: string;
}

/* Type used to represent the booking as received from the API. */
export interface ApiBooking {
  endtime: string;
  startmode: string;
  id: string;
  starttime: string;
  title: string;
}

/* Mapping between the more common studio names in use these days and the old names used in the API. */
export enum Studio {
  Studio1 = 'studio',
  Studio2 = 'teknikerrom',
  Autoavvikler = 'autoavvikler',
}
