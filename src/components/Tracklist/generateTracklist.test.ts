import { Tracklist, Element } from 'api';
import { generateTracklist } from './generateTracklist';

import { bookingDetailsList, tracklist } from '../../resources/tracklist';

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

  it('sets the name of the generated tracklist to the name of the first booking', () => {
    expect(generatedTracklist.name).toEqual(bookingDetailsList[0].title);
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

  it('converts Elements with class Music to Track sections, and others to Chapter sections', () => {
    elements.forEach((el, idx) => {
      if (el.class === 'Music') {
        expect(Object.keys(generatedTracklist.sections[idx])).toContain(
          'artist',
        );
      } else {
        expect(Object.keys(generatedTracklist.sections[idx])).toContain('name');
      }
    });
  });

  it.skip('generates a unified tracklist given a list of bookings', () => {
    expect(generateTracklist(bookingDetailsList)).toBe(tracklist);
  });
});
