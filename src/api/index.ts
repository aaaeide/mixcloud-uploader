import { parse } from 'date-fns';
import { Booking, ApiBooking, Studio } from './types';

export const BROADCAST_API_URL = 'https://api.radiorevolt.no/v2/sendinger';

export function parseDateString(dateString: string): Date {
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
