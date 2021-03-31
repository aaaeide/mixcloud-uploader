import { BookingDetails, Element, Tracklist, Section } from '../../api';

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

    if (el.class === 'Music') {
      sections.push({
        artist: el.artist ?? '',
        song: el.title,
        startTime,
      });
    } else {
      sections.push({
        name: el.title,
        startTime,
      });
    }
  });

  return {
    mp3: null,
    name: bookingDetailList[0].title,
    picture: null,
    description: '',
    tags: [],
    sections,
  };
}
