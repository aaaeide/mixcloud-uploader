import { parseDateString, fetchBookingList } from './index';
import { Studio } from './types';

import normalBookingList from '../resources/bookinglists/normalBookingList.json';
import emptyBookingList from '../resources/bookinglists/emptyBookingList.json';

function mockFetch(mockedReturn?: unknown): void {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockedReturn),
    } as Response),
  );
}

describe('parseDateString', () => {
  it('parses date strings correctly', () => {
    const dateString = '2020-09-25 07:29:00';
    const parsed = parseDateString(dateString);
    expect(parsed).toEqual(new Date(2020, 8, 25, 7, 29, 0, 0));
  });

  it('handles bad datestrings', () => {
    const badStrings = ['2020-09-2507:29:00', 'igår kl 4', ''];
    badStrings
      .map((badString) => parseDateString(badString))
      .forEach((parsed) => expect(parsed.getTime()).toEqual(NaN));
  });
});

describe('api', () => {
  it('parses filled booking list properly', async () => {
    mockFetch(normalBookingList);
    const fetchedBookingList = await fetchBookingList(0, 0, 0, Studio.Studio1);
    expect(fetchedBookingList[0].title).toEqual('RevoltMorgen #1');
    expect('startmode' in fetchedBookingList[0]).toBeFalsy();
  });

  it('parses empty booking list properly', async () => {
    mockFetch(emptyBookingList);
    const fetchedBookingList = await fetchBookingList(0, 0, 0, Studio.Studio1);
    expect(fetchedBookingList.length).toEqual(0);
  });
});
