/* eslint-disable camelcase */
/* Booking type used internally */
export interface Booking {
  startTime: Date;
  endTime: Date;
  title: string;
  id: string;
  studio: Studio;
}

/* Type used to represent the booking as received from the API. */
export interface ApiBooking {
  endtime: string;
  startmode: string;
  id: string;
  starttime: string;
  title: string;
}

/* Mapping between the more common studio names in use these days and the old names used in the API. */
export enum Studio {
  Studio1 = 'studio',
  Studio2 = 'teknikerrom',
  Autoavvikler = 'autoavvikler',
}

export interface ApiElement {
  album: string;
  info: string;
  from_jinglebank: boolean;
  author: string;
  planned_stop: string;
  title: string;
  planned_start: string;
  id: string;
  part_of_show: boolean;
  sendstate: string;
  media_type: string;
  artist: string;
  class: string;
  actual_stop: string;
  actual_start: string;
}

export interface ApiBookingDetails {
  elements: ApiElement[];
  metadata: ApiBooking;
}

export interface Element {
  id: string;
  title: string;
  artist?: string;
  album?: string;
  info?: string;
  sendState: 'Planned' | 'Skipped' | 'Sent';
  class: 'Music' | 'Promotion' | 'None';
  startTime: Date;
  endTime: Date;
}

export interface BookingDetails {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  studio: Studio;
  elements: Element[];
}

/** The tracklist according to MixCloud spec. */
export interface Tracklist {
  /** REQUIRED. The audio file to be uploaded. The file should not be larger than 4294967296 bytes. */
  mp3: unknown;
  /** REQUIRED (if a track). The track section song title. */
  name: string;
  /** A picture for the upload. The file should not be larger than 10485760 bytes. */
  picture: unknown;
  /** A description for the upload. Maximum of 1000 characters. */
  description: string;
  /** tags-X-tag | Where X is a number 0-4, a tag name for the upload. Up to 5 tags can be provided. */
  tags: string[];
  /** ONLY FOR UPLOADING TO PRO ACCOUNTS. Scheduled publish date for the upload in the format YYYY-MM-DDTHH:MM:SSZ 
  (e.g. 2015-11-21T14:05:00Z). Note: the date MUST be UTC so you may need to convert for your local timezone first. */
  publish_date?: Date;
  /** ONLY FOR UPLOADING TO PRO ACCOUNTS. Disable comments for this upload */
  disable_comments?: boolean;
  /** ONLY FOR UPLOADING TO PRO ACCOUNTS. Hide play, favorite and repost counts for this upload */
  hide_stats?: boolean;
  /** ONLY FOR UPLOADING TO PRO ACCOUNTS. Make this upload unlisted. The upload will not appear under your profile page 
  when other users visit it. Only users who know the upload's link will have access to it. */
  unlisted?: boolean;
  /** Track/chapter information. */
  sections: Section[];
}

/** One section in a Tracklist. */
export interface Section {
  /** For determining what type of MC section this is. Jingles are the same as Chapters when published to MC. */
  type: 'Track' | 'Chapter' | 'Jingle';
  /** FOR CHAPTERS: The name of a chapter section. FOR TRACKS: REQUIRED (if a track). The track section song title. */
  title: string;
  /** The time, in seconds (integer), at which section X starts. */
  startTime: number;
  /** REQUIRED (if a track). The track section artist name. NOT USED FOR CHAPTERS. */
  artist?: string;
}
