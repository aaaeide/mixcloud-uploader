/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  BookingDetails,
  Element,
  Tracklist,
  Section,
  Booking,
  fetchBookingDetails,
} from 'api';

import {
  ReducerActionsType,
  setBookingDetailsLoading,
  setTracklist,
} from 'state';

const PROMO_PAUSE_REMOVAL_EXPLANATION =
  'Dersom det var promopauser da du spilte inn denne episoden og de har blitt klippet vekk før opplasting til MixCloud, er det sannsynligvis ønskelig å forskyve alle elementene som finner sted etter en promopause med minus x minutter, der x er antallet promopauser som fant sted før elementet. Trykk OK for å gjøre dette, Cancel for å fortsette uten å fjerne promopauser.';

/**
 * For when you've selected some studio bookings and wish to generate a tracklist.
 */
export async function fetchDetailsAndGenerateTracklist(
  dispatch: React.Dispatch<ReducerActionsType>,
  selectedBookings: Booking[],
): Promise<void> {
  dispatch(setBookingDetailsLoading(true));

  const fetchedBookingDetails = await Promise.all(
    selectedBookings.map((booking) => {
      const { startTime: date, id, studio } = booking;

      return fetchBookingDetails(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        studio,
        id,
      );
    }),
  );

  let generatedTracklist = generateTracklist(fetchedBookingDetails);

  if (
    generatedTracklist !== null &&
    window.confirm(PROMO_PAUSE_REMOVAL_EXPLANATION)
  ) {
    generatedTracklist = removePromoPause(generatedTracklist);
  }

  dispatch(setTracklist(generatedTracklist));
  dispatch(setBookingDetailsLoading(false));
}

export function generateTracklist(
  bookingDetailList: BookingDetails[],
): Tracklist | null {
  if (bookingDetailList.length === 0) {
    return null;
  }

  const sections: Section[] = [];
  const elements = bookingDetailList.reduce<Element[]>(
    (els, bd) => els.concat(bd.elements),
    [],
  );
  const showStartDate = elements[0].startTime.getTime();

  elements.forEach((el) => {
    const startTime = Math.floor(
      (el.startTime.getTime() - showStartDate) / 1000,
    );

    // eslint-disable-next-line default-case
    switch (el.class) {
      case 'Music':
        sections.push({
          type: 'Track',
          title: el.title,
          artist: el.artist ?? '',
          startTime,
        });
        break;
      case 'Promotion':
        sections.push({
          type: 'Jingle',
          title: el.title,
          startTime,
        });
        break;
      case 'None':
        sections.push({
          type: 'Chapter',
          title: el.title,
          startTime,
        });
        break;
    }
  });

  const name = bookingDetailList
    .reduce<string>((nm, bd) => `${nm + bd.title}, `, '')
    .slice(0, -2);

  return {
    mp3: null,
    name,
    picture: null,
    description: '',
    tags: [],
    sections,
  };
}

export const removePromoPause = (tracklist: Tracklist): Tracklist => ({
  ...tracklist,
  sections: tracklist.sections.map((sec) => ({
    ...sec,
    startTime:
      /* I am deeply ashamed about this bit of code. What it does is check how many promo pauses an item occurs after. This is equivalent to counting odd multiples of 30, since promo pauses occur on the 30th minute of every hour. This does not remove promo pauses after the fourth hour of a show, but Radio Revolt does not really do shows longer than 2 hours anyway. */
      sec.startTime -
      (sec.startTime >= 7 * 30 * 60
        ? 4 * 60
        : sec.startTime >= 5 * 30 * 60
        ? 3 * 60
        : sec.startTime >= 3 * 30 * 60
        ? 2 * 60
        : sec.startTime >= 1 * 30 * 60
        ? 1 * 60
        : 0),
  })),
});
