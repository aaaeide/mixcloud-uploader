/* eslint-disable camelcase */
/* Booking type used internally */
export interface Booking {
  startTime: Date;
  endTime: Date;
  title: string;
  id: string;
  studio: Studio;
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

export interface ApiElement {
  album: string;
  info: string;
  from_jinglebank: boolean;
  author: string;
  planned_stop: string;
  title: string;
  planned_start: string;
  id: string;
  part_of_show: boolean;
  sendstate: string;
  media_type: string;
  artist: string;
  class: string;
  actual_stop: string;
  actual_start: string;
}

export interface ApiBookingDetails {
  elements: ApiElement[];
  metadata: ApiBooking;
}

export interface Element {
  id: string;
  title: string;
  artist?: string;
  album?: string;
  info?: string;
  sendState: 'Planned' | 'Skipped' | 'Sent';
  class: 'Music' | 'Promotion' | 'None';
  startTime: Date;
  endTime: Date;
}

export interface BookingDetails {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  studio: Studio;
  elements: Element[];
}
