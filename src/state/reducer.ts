import { Studio } from '../api';
import {
  ReducerState,
  SELECT_DATE,
  SELECT_STUDIO,
  SET_BOOKING_LIST_LOADING,
  SET_CURRENT_BOOKING_LIST,
  SET_SELECTED_BOOKINGS,
  ReducerActionsType,
} from './types';

export const initialState: ReducerState = {
  selectedDate: new Date(),
  selectedStudio: Studio.Studio1,
  currentBookingList: [],
  bookingListLoading: false,
  selectedBookings: [],
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
    default:
      return state;
  }
}
