/* eslint-disable no-nested-ternary */
import { BookingDetails, Element, Tracklist, Section } from 'api';

export function generateTracklist(
  bookingDetailList: BookingDetails[],
): Tracklist {
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
