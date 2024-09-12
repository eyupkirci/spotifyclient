//playlist
export interface IPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: {spotify: string};
  href: string;
  id: string;
  images: {height: number | null; url: string; width: number | null}[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {spotify: string};
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {href: string; total: number};
  type: string;
  uri: string;
}

export interface IPlaylists {
  playlists: {
    href: string;
    items: IPlaylist[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
}
export interface IPlaylistsResponse {
  message: string;
  playlists: IPlaylists;
}
//tracks

export interface IArtist {
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface ITrack {
  id: string;
  name: string;
  artists: IArtist[];
  album: {
    id: string;
    name: string;
    images: {url: string; width: number; height: number}[];
  };
  duration_ms: number;
  explicit: boolean;
  external_urls: {spotify: string};
  href: string;
  preview_url: string | null;
  type: string;
  uri: string;
}

export interface IPlaylistTrackItem {
  added_at: string;
  added_by: {id: string; name: string}[];
  is_local: boolean;
  primary_color: string | null;
  track: ITrack;
  video_thumbnail: {url: string}[];
}

export interface IPlaylistTracksResponse {
  href: string;
  items: IPlaylistTrackItem[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}
