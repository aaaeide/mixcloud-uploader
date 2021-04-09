import { Studio, Booking, Tracklist } from '../api';
import {
  SELECT_DATE,
  SELECT_STUDIO,
  SET_BOOKING_LIST_LOADING,
  SET_CURRENT_BOOKING_LIST,
  SET_SELECTED_BOOKINGS,
  SET_TRACKLIST,
  SET_BOOKING_DETAILS_LOADING,
  SET_TITLE,
  SET_DESCRIPTION,
  SET_ONDEMAND_URL,
  SelectDateAction,
  SelectStudioAction,
  SetBookingListLoadingAction,
  SetCurrentBookingListAction,
  SetSelectedBookingsAction,
  SetTracklistAction,
  SetBookingDetailsLoadingAction,
  SetTitleAction,
  SetDescriptionAction,
  SetOndemandUrlAction,
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

export function setTracklist(tracklist: Tracklist | null): SetTracklistAction {
  return {
    type: SET_TRACKLIST,
    payload: { tracklist },
  };
}

export function setBookingDetailsLoading(
  isLoading: boolean,
): SetBookingDetailsLoadingAction {
  return {
    type: SET_BOOKING_DETAILS_LOADING,
    payload: { isLoading },
  };
}

export function setTitle(title: string): SetTitleAction {
  return {
    type: SET_TITLE,
    payload: { title },
  };
}

export function setDescription(description: string): SetDescriptionAction {
  return {
    type: SET_DESCRIPTION,
    payload: { description },
  };
}

export function setOndemandUrl(ondemandUrl: string): SetOndemandUrlAction {
  return {
    type: SET_ONDEMAND_URL,
    payload: { ondemandUrl },
  };
}
