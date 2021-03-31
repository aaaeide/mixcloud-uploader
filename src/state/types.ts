import { Booking, Studio, Tracklist } from '../api';

export interface ReducerState {
  selectedDate: Date | null;
  selectedStudio: Studio;
  currentBookingList: Booking[];
  bookingListLoading: boolean;
  selectedBookings: Booking[];
  tracklist: Tracklist | null;
  bookingDetailsLoading: boolean;
}

export const SELECT_DATE = 'SELECT_DATE';
export const SELECT_STUDIO = 'SELECT_STUDIO';
export const SET_CURRENT_BOOKING_LIST = 'SET_CURRENT_BOOKING_LIST';
export const SET_BOOKING_LIST_LOADING = 'SET_BOOKING_LIST_LOADING';
export const SET_SELECTED_BOOKINGS = 'SET_SELECTED_BOOKINGS';
export const SET_BOOKING_DETAILS_LOADING = 'SET_BOOKING_DETAILS_LOADING';
export const SET_TRACKLIST = 'SET_TRACKLIST';

export interface SelectDateAction {
  type: typeof SELECT_DATE;
  payload: { date: Date | null };
}

export interface SelectStudioAction {
  type: typeof SELECT_STUDIO;
  payload: { studio: Studio };
}

export interface SetCurrentBookingListAction {
  type: typeof SET_CURRENT_BOOKING_LIST;
  payload: { bookingList: Booking[] };
}

export interface SetBookingListLoadingAction {
  type: typeof SET_BOOKING_LIST_LOADING;
  payload: { isLoading: boolean };
}

export interface SetSelectedBookingsAction {
  type: typeof SET_SELECTED_BOOKINGS;
  payload: { selectedBookings: Booking[] };
}

export interface SetBookingDetailsLoadingAction {
  type: typeof SET_BOOKING_DETAILS_LOADING;
  payload: { isLoading: boolean };
}

export interface SetTracklistAction {
  type: typeof SET_TRACKLIST;
  payload: { tracklist: Tracklist };
}

export type ReducerActionsType =
  | SelectDateAction
  | SelectStudioAction
  | SetCurrentBookingListAction
  | SetBookingListLoadingAction
  | SetSelectedBookingsAction
  | SetBookingDetailsLoadingAction
  | SetTracklistAction;
