import { Studio, Booking } from '../api';
import {
  SELECT_DATE,
  SELECT_STUDIO,
  SET_BOOKING_LIST_LOADING,
  SET_CURRENT_BOOKING_LIST,
  SET_SELECTED_BOOKINGS,
  SelectDateAction,
  SelectStudioAction,
  SetBookingListLoadingAction,
  SetCurrentBookingListAction,
  SetSelectedBookingsAction,
} from './types';

export function selectDate(date: Date | null): SelectDateAction {
  return {
    type: SELECT_DATE,
    payload: { date },
  };
}

export function selectStudio(studio: Studio): SelectStudioAction {
  return {
    type: SELECT_STUDIO,
    payload: { studio },
  };
}

export function setCurrentBookingList(
  bookingList: Booking[],
): SetCurrentBookingListAction {
  return {
    type: SET_CURRENT_BOOKING_LIST,
    payload: { bookingList },
  };
}

export function setBookingListLoading(
  isLoading: boolean,
): SetBookingListLoadingAction {
  return {
    type: SET_BOOKING_LIST_LOADING,
    payload: { isLoading },
  };
}

export function setSelectedBookings(
  bookings: Booking[],
): SetSelectedBookingsAction {
  return {
    type: SET_SELECTED_BOOKINGS,
    payload: { selectedBookings: bookings },
  };
}
