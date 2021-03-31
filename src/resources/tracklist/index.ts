import { BookingDetails, Tracklist, Studio } from '../../api';

export const bookingDetailsList: BookingDetails[] = [
  {
    elements: [
      {
        id: '00000064',
        title: 'Husk \u00e5 fjern reprise fra Autoavvikler',
        artist: '',
        album: '',
        info: '',
        sendState: 'Skipped',
        class: 'None',
        startTime: new Date('2020-09-25 18:00:00'),
        endTime: new Date('2020-09-25 18:00:00'),
      },
      {
        id: '00000065',
        title: '\u00c5PNING - Feber',
        artist: '',
        album: '',
        info: '',
        sendState: 'Sent',
        class: 'Promotion',
        startTime: new Date('2020-09-25 18:00:00'),
        endTime: new Date('2020-09-25 18:00:32'),
      },
      {
        id: '00000066',
        title: 'Money Up (feat. Toro y Moi)',
        artist: 'MadeinTYO, Toro y Moi',
        album: 'Money Up (feat. Toro y Moi)',
        info: '',
        sendState: 'Sent',
        class: 'Music',
        startTime: new Date('2020-09-25 18:00:32'),
        endTime: new Date('2020-09-25 18:03:20'),
      },
    ],
    id: '00000070',
    title: 'Feber #1',
    startTime: new Date('2020-09-25 18:00:00.000'),
    endTime: new Date('2020-09-25 18:29:00.000'),
    studio: Studio.Studio1,
  },
  {
    elements: [
      {
        id: '00000067',
        title: 'Jay Rock - No Joke (FEBER)',
        artist: '',
        album: '',
        info: '',
        sendState: 'Sent',
        class: 'None',
        startTime: new Date('2020-09-25 18:03:03'),
        endTime: new Date('2020-09-25 18:05:22'),
      },
      {
        id: '00000068',
        title: 'Holy',
        artist: 'Lil Wayne',
        album: 'Tha Carter V (Deluxe Edition)',
        info: '',
        sendState: 'Sent',
        class: 'Music',
        startTime: new Date('2020-09-25 18:04:53'),
        endTime: new Date('2020-09-25 18:08:49'),
      },
    ],
    id: '00000070',
    title: 'Feber #2',
    startTime: new Date('2020-09-25 18:30:00.000'),
    endTime: new Date('2020-09-25 19:00:00.000'),
    studio: Studio.Studio1,
  },
];

export const tracklist: Tracklist = {
  mp3: null,
  name: 'Feber #1',
  picture: null,
  description: '',
  tags: [],
  sections: [
    {
      name: '\u00c5PNING - Feber',
      startTime: 0,
    },
    {
      artist: 'MadeinTYO, Toro y Moi',
      song: 'Money Up (feat. Toro y Moi)',
      startTime: 32,
    },

    {
      artist: '',
      song: 'Jay Rock - No Joke (FEBER)',
      startTime: 183,
    },
    {
      artist: 'Lil Wayne',
      song: 'Holy',
      startTime: 293,
    },
  ],
};
