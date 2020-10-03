import {
  parseDateString,
  fetchBookingList,
  fetchBookingDetails,
} from './index';
import { Studio } from './types';

import normalBookingList from '../resources/bookinglists/normalBookingList.json';
import emptyBookingList from '../resources/bookinglists/emptyBookingList.json';

import bookingWithElements from '../resources/bookingDetails/bookingWithElements.json';
import emptyBooking from '../resources/bookingDetails/emptyBooking.json';

/**
 * Mocks the fetch function used by the API methods to always
 * return mockedReturn. Useful for testing certain results from
 * the API without actually calling it.
 */
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

describe('fetchBookingList', () => {
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

describe('fetchBookingDetails', () => {
  it('parses booking with elements properly', async () => {
    mockFetch(bookingWithElements);
    const fetchedBookingDetails = await fetchBookingDetails(
      2020,
      8,
      25,
      Studio.Studio1,
      '00000070',
    );

    expect(fetchedBookingDetails.startTime).toEqual(
      new Date(2020, 8, 25, 18, 0, 0, 0),
    );
    expect(fetchedBookingDetails.endTime).toEqual(
      new Date(2020, 8, 25, 18, 29, 0, 0),
    );
    expect(fetchedBookingDetails.title).toEqual('Feber #1');
    expect(fetchedBookingDetails.elements[0].title).toEqual(
      'Husk å fjern reprise fra Autoavvikler',
    );
  });

  it('parses booking with no elements properly', async () => {
    mockFetch(emptyBooking);
    const fetchedBookingDetails = await fetchBookingDetails(
      2020,
      9,
      8,
      Studio.Studio1,
      '00000094',
    );
    expect(fetchedBookingDetails.startTime).toEqual(
      new Date(2020, 9, 8, 11, 0, 0, 0),
    );
    expect(fetchedBookingDetails.endTime).toEqual(
      new Date(2020, 9, 8, 11, 29, 0, 0),
    );
    expect(fetchedBookingDetails.title).toEqual('Lytt på nytt #1');
    expect(fetchedBookingDetails.elements.length).toEqual(0);
  });
});
