import { Tracklist, Element } from 'api';
import { bookingDetailsList, tracklistWithPromos } from 'resources/tracklist';
import { generateTracklist, removePromoPause } from './tracklistUtils';

describe('generateTracklist', () => {
  let generatedTracklist: Tracklist;
  let elements: Element[];

  beforeEach(() => {
    generatedTracklist = generateTracklist(bookingDetailsList);
    elements = bookingDetailsList.reduce<Element[]>(
      (els, bd) => els.concat(bd.elements),
      [],
    );
  });

  it('sets the name of the generated tracklist to the name of the selected bookings, comma-separated', () => {
    const name = bookingDetailsList
      .reduce<string>((nm, bd) => `${nm}${bd.title}, `, '')
      .slice(0, -2);

    expect(generatedTracklist.name).toEqual(name);
  });

  it('converts Date to second offset from start', () => {
    const showStartDate = bookingDetailsList[0].startTime;

    expect(elements.length).toEqual(generatedTracklist.sections.length);

    elements.forEach((el, idx) => {
      expect(generatedTracklist.sections[idx].startTime).toEqual(
        Math.floor((el.startTime.getTime() - showStartDate.getTime()) / 1000),
      );
    });
  });

  it('converts Elements with class Music to Track sections, class Promotion to Jingle sections and class None to Chapter sections', () => {
    elements.forEach((el, idx) => {
      const section = generatedTracklist.sections[idx];
      const sectionKeys = Object.keys(generatedTracklist.sections[idx]);

      // eslint-disable-next-line default-case
      switch (el.class) {
        case 'Music':
          expect(section.type).toEqual('Track');
          expect(sectionKeys).toContain('artist');
          break;
        case 'Promotion':
          expect(section.type).toEqual('Jingle');
          expect(sectionKeys).not.toContain('artist');
          break;
        case 'None':
          expect(section.type).toEqual('Chapter');
          expect(sectionKeys).not.toContain('artist');
          break;
      }
    });
  });

  /* it.skip('generates a unified tracklist given a list of bookings', () => {
    expect(generateTracklist(bookingDetailsList)).toBe(tracklist);
  }); */
});

describe('removePromoPause', () => {
  it('removes the 30th minute form every hour by moving every Section after it one minute back', () => {
    const modifiedTracklist = removePromoPause(tracklistWithPromos);
    const startTimes = modifiedTracklist.sections.map<number>(
      (section) => section.startTime,
    );

    expect(startTimes).toStrictEqual([0, 0, 32, 1740, 1878, 5280, 5503]);
  });
});
