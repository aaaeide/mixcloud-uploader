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

  return {
    mp3: null,
    name: bookingDetailList[0].title,
    picture: null,
    description: '',
    tags: [],
    sections,
  };
}
