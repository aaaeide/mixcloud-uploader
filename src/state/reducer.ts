import { Studio } from '../api';
import {
  ReducerState,
  SELECT_DATE,
  SELECT_STUDIO,
  SET_BOOKING_LIST_LOADING,
  SET_CURRENT_BOOKING_LIST,
  SET_SELECTED_BOOKINGS,
  SET_TRACKLIST,
  SET_BOOKING_DETAILS_LOADING,
  ReducerActionsType,
  SET_TITLE,
  SET_DESCRIPTION,
  SET_AUTH_OBJECT,
  SET_PICTURE,
} from './types';

export const initialState: ReducerState = {
  selectedDate: new Date(),
  selectedStudio: Studio.Studio1,
  currentBookingList: [],
  bookingListLoading: false,
  selectedBookings: [],
  tracklist: null,
  bookingDetailsLoading: false,
  title: '',
  description: '',
  authObject: null,
  picture: null,
  audio: null,
};

export function reducer(
  state: ReducerState,
  action: ReducerActionsType,
): ReducerState {
  switch (action.type) {
    case SELECT_DATE:
      return {
        ...state,
        selectedDate: action.payload.date,
      };
    case SELECT_STUDIO:
      return {
        ...state,
        selectedStudio: action.payload.studio,
      };
    case SET_CURRENT_BOOKING_LIST:
      return {
        ...state,
        currentBookingList: action.payload.bookingList,
      };
    case SET_BOOKING_LIST_LOADING:
      return {
        ...state,
        bookingListLoading: action.payload.isLoading,
      };
    case SET_SELECTED_BOOKINGS:
      return {
        ...state,
        selectedBookings: action.payload.selectedBookings,
      };
    case SET_TRACKLIST:
      return {
        ...state,
        tracklist: action.payload.tracklist,
      };
    case SET_BOOKING_DETAILS_LOADING:
      return {
        ...state,
        bookingDetailsLoading: action.payload.isLoading,
      };
    case SET_TITLE:
      return {
        ...state,
        title: action.payload.title,
      };
    case SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload.description,
      };
    case SET_AUTH_OBJECT:
      return {
        ...state,
        authObject: action.payload.authObject,
      };
    case SET_PICTURE:
      return {
        ...state,
        picture: action.payload.picture,
      };
    case 'SET_AUDIO':
      return {
        ...state,
        audio: action.payload.audio,
      };
    default:
      return state;
  }
}
