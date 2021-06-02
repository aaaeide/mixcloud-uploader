interface MixCloudAuthResponse {
  // eslint-disable-next-line camelcase
  access_token: string;
}
interface MixCloudUserInfoResponse {
  username: string;
}

const TOKEN_URL = (
  clientId: string,
  redirectUri: string,
  clientSecret: string,
  code: string,
): string =>
  `https://www.mixcloud.com/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`;

const ME_URL = (accessToken: string): string =>
  `https://api.mixcloud.com/me/?access_token=${accessToken}`;

export async function fetchAuthDetails(
  clientId: string,
  clientSecret: string,
  code: string,
  redirectUri: string,
): Promise<{ accessToken: string; username: string }> {
  /* Fetch access token. */
  const tokenFetchResponse = await fetch(
    TOKEN_URL(clientId, redirectUri, clientSecret, code),
  );

  const {
    access_token: accessToken,
  } = (await tokenFetchResponse.json()) as MixCloudAuthResponse;

  /* Fetch username. */
  const userInfoFetchResponse = await fetch(ME_URL(accessToken));
  const {
    username,
  } = (await userInfoFetchResponse.json()) as MixCloudUserInfoResponse;

  return { accessToken, username };
}
