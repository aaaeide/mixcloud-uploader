import { ReducerState } from 'state';

const fail = (cause: string): void => alert(`Could not upload: ${cause}`);
const UPLOAD_URL = (accessToken: string): string =>
  `https://api.mixcloud.com/upload/?access_token=${accessToken}`;

/**
 * Upload the show to MixCloud.
 *
 * Per https://www.mixcloud.com/developers/#uploads:
 * The MP3, metadata and image should all be uploaded in a single multipart/form-data
 */
export async function upload(state: ReducerState): Promise<Response | void> {
  if (state.title === '') {
    return fail('no title given');
  }

  if (state.audio === null) {
    return fail('no audio file selected');
  }

  if (state.tracklist === null) {
    return fail('no tracklist selected');
  }

  if (state.authObject === null) {
    return fail('you are not logged in');
  }

  const data = new FormData();
  data.append('name', state.title);
  data.append('description', state.description);
  data.append('mp3', state.audio);

  if (state.picture !== null) {
    data.append('picture', state.picture);
  }

  const unknownSections: string[] = [];

  state.tracklist.sections.forEach((section, idx) => {
    switch (section.type) {
      case 'Track':
        data.append(`sections-${idx}-artist`, section.artist ?? '');
        data.append(`sections-${idx}-song`, section.title);
        data.append(`sections-${idx}-start_time`, `${section.startTime}`);
        break;
      case 'Chapter':
      case 'Jingle':
        data.append(`sections-${idx}-chapter`, section.title);
        data.append(`sections-${idx}-start_time`, `${section.startTime}`);
        break;
      default:
        unknownSections.push(section.type);
        break;
    }
  });

  if (unknownSections.length > 0) {
    return fail(`bad sections: ${unknownSections.join(', ')}`);
  }

  return fetch(UPLOAD_URL(state.authObject.accessToken), {
    method: 'POST',
    body: data,
    mode: 'no-cors',
  });
}
