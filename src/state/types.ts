import { Booking, Studio, Tracklist } from '../api';

export interface AuthObject {
  accessToken: string;
  username: string;
}

export interface ReducerState {
  selectedDate: Date | null;
  selectedStudio: Studio;
  currentBookingList: Booking[];
  bookingListLoading: boolean;
  selectedBookings: Booking[];
  tracklist: Tracklist | null;
  bookingDetailsLoading: boolean;
  title: string;
  description: string;
  ondemandUrl: string;
  authObject: AuthObject | null;
}

export const SELECT_DATE = 'SELECT_DATE';
export const SELECT_STUDIO = 'SELECT_STUDIO';
export const SET_CURRENT_BOOKING_LIST = 'SET_CURRENT_BOOKING_LIST';
export const SET_BOOKING_LIST_LOADING = 'SET_BOOKING_LIST_LOADING';
export const SET_SELECTED_BOOKINGS = 'SET_SELECTED_BOOKINGS';
export const SET_BOOKING_DETAILS_LOADING = 'SET_BOOKING_DETAILS_LOADING';
export const SET_TRACKLIST = 'SET_TRACKLIST';
export const SET_TITLE = 'SET_TITLE';
export const SET_DESCRIPTION = 'SET_DESCRIPTION';
export const SET_ONDEMAND_URL = 'SET_ONDEMAND_URL';
export const SET_AUTH_OBJECT = 'SET_AUTH_OBJECT';
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
  payload: { tracklist: Tracklist | null };
}

export interface SetTitleAction {
  type: typeof SET_TITLE;
  payload: { title: string };
}

export interface SetDescriptionAction {
  type: typeof SET_DESCRIPTION;
  payload: { description: string };
}

export interface SetOndemandUrlAction {
  type: typeof SET_ONDEMAND_URL;
  payload: { ondemandUrl: string };
}

export interface SetAuthObjectAction {
  type: typeof SET_AUTH_OBJECT;
  payload: { authObject: AuthObject };
}

export type ReducerActionsType =
  | SelectDateAction
  | SelectStudioAction
  | SetCurrentBookingListAction
  | SetBookingListLoadingAction
  | SetSelectedBookingsAction
  | SetBookingDetailsLoadingAction
  | SetTracklistAction
  | SetTitleAction
  | SetDescriptionAction
  | SetOndemandUrlAction
  | SetAuthObjectAction;
