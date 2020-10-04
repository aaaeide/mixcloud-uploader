import { Booking, Studio } from '../api';

export interface ReducerState {
  selectedDate: Date | null;
  selectedStudio: Studio;
  currentBookingList: Booking[];
  bookingListLoading: boolean;
  selectedBookings: Booking[];
}

export const SELECT_DATE = 'SELECT_DATE';
export const SELECT_STUDIO = 'SELECT_STUDIO';
export const SET_CURRENT_BOOKING_LIST = 'SET_CURRENT_BOOKING_LIST';
export const SET_BOOKING_LIST_LOADING = 'SET_BOOKING_LIST_LOADING';
export const SET_SELECTED_BOOKINGS = 'SET_SELECTED_BOOKINGS';

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

export type ReducerActionsType =
  | SelectDateAction
  | SelectStudioAction
  | SetCurrentBookingListAction
  | SetBookingListLoadingAction
  | SetSelectedBookingsAction;
