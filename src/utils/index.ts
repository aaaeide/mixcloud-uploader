/**
 * Mocks the fetch function used by the API methods to always
 * return mockedReturn. Useful for testing certain results from
 * the API without actually calling it.
 */
export function mockFetch(mockedReturn?: unknown): void {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockedReturn),
    } as Response),
  );
}
