import { parse } from 'date-fns';
import {
  Studio,
  Booking,
  ApiBooking,
  ApiBookingDetails,
  BookingDetails,
} from './types';

export const BROADCAST_API_URL = 'https://api.radiorevolt.no/v2/sendinger';

export function parseDateString(dateString: string): Date {
  if (dateString.includes('.')) {
    // Formatted with ms
    return parse(dateString, 'yyyy-MM-dd HH:mm:ss.SSS', new Date());
  }

  return parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
}

export async function fetchBookingList(
  year: number,
  month: number,
  day: number,
  studio: Studio,
): Promise<Booking[]> {
  const response = await fetch(
    `${BROADCAST_API_URL}/dato/${year}/${month}/${day}/${studio}`,
  );
  const data = (await response.json()) as ApiBooking[];
  const bookingList: Booking[] = data.map((apiBooking) => ({
    startTime: parseDateString(apiBooking.starttime),
    endTime: parseDateString(apiBooking.endtime),
    title: apiBooking.title,
    id: apiBooking.id,
  }));

  return bookingList;
}

export async function fetchBookingDetails(
  year: number,
  month: number,
  day: number,
  studio: Studio,
  id: string,
): Promise<BookingDetails> {
  const response = await fetch(
    `${BROADCAST_API_URL}/dato/${year}/${month}/${day}/${studio}/${id}`,
  );
  const data = (await response.json()) as ApiBookingDetails;
  const bookingDetails: BookingDetails = {
    id: data.metadata.id,
    title: data.metadata.title,
    startTime: parseDateString(data.metadata.starttime),
    endTime: parseDateString(data.metadata.endtime),
    elements: data.elements.map((apiElement) => ({
      id: apiElement.id,
      title: apiElement.title,
      artist: apiElement.artist !== '' ? apiElement.artist : undefined,
      album: apiElement.album !== '' ? apiElement.album : undefined,
      info: apiElement.info !== '' ? apiElement.info : undefined,
      sendState: apiElement.sendstate as 'Planned' | 'Skipped' | 'Sent',
      class: apiElement.class as 'Music' | 'Promotion' | 'None',
      startTime: parseDateString(
        apiElement.actual_start !== ''
          ? apiElement.actual_start
          : apiElement.planned_start,
      ),
      endTime: parseDateString(
        apiElement.actual_stop !== ''
          ? apiElement.actual_stop
          : apiElement.planned_stop,
      ),
    })),
  };

  return bookingDetails;
}
