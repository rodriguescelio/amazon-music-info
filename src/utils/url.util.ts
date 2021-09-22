import { AmazonMusicUrlType } from '../models/amazonMusicUrlType';

export const isAmazonMusic = (url: string) =>
  url.indexOf('music.amazon.com') !== -1;

export const isAmazonMusicType = (url: string, type: AmazonMusicUrlType) =>
  isAmazonMusic(url) && url.indexOf(`/${type}/`) !== -1;

export const isAmazonMusicPlaylist = (url: string) =>
  isAmazonMusicType(url, AmazonMusicUrlType.PLAYLIST);

export const isAmazonMusicAlbum = (url: string) =>
  isAmazonMusicType(url, AmazonMusicUrlType.ALBUM);

export const isAmazonMusicArtist = (url: string) =>
  isAmazonMusicType(url, AmazonMusicUrlType.ARTIST);

export const getAmazonMusicCode = (url: string, type: AmazonMusicUrlType) => {
  const expression = new RegExp(`/${type}/(\\w+)`);
  const code = url.match(expression);
  return code && code.length >= 2 ? code[1] : null;
};
