import axios from 'axios';
import { AmazonMusicInfoResult } from './models/amazonMusicInfoResult';
import { AmazonMusicInfoResultItem } from './models/AmazonMusicInfoResultItem';
import { AmazonMusicUrlType } from './models/amazonMusicUrlType';
import { DeeplinkResponse } from './models/deeplinkResponse';
import { getDurationInSeconds } from './utils/datetime.util';
import {
  getAmazonMusicCode,
  isAmazonMusic,
  isAmazonMusicAlbum,
  isAmazonMusicArtist,
  isAmazonMusicPlaylist,
} from './utils/url.util';

export * from './utils/url.util';

const AMAZON_URL = 'https://music.amazon.com';
const SERVICE_URL = 'https://na.mesk.skill.music.a2z.com/api/showHome';

const DEFAULT_OPTIONS = {
  headers: {
    'user-agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    'x-amzn-application-version': '1.0.7980.0',
    'x-amzn-authentication':
      '{"interface":"ClientAuthenticationInterface.v1_0.ClientTokenElement","accessToken":""}',
    'x-amzn-device-family': 'WebPlayer',
    'x-amzn-device-height': '1080',
    'x-amzn-device-id': '13436091444745537',
    'x-amzn-device-language': 'pt_BR',
    'x-amzn-device-model': 'WEBPLAYER',
    'x-amzn-device-width': '1920',
    'x-amzn-music-domain': 'music.amazon.com.br',
    'x-amzn-os-version': '1.0',
    'x-amzn-page-url': AMAZON_URL,
    'x-amzn-session-id': '133-3289044-2947901',
    'x-amzn-timestamp': '1631644168280',
  },
};

const requestData = async (
  code: string,
  type: AmazonMusicUrlType
): Promise<AmazonMusicInfoResult | null> => {
  const deeplink = `%7B%22interface%22%3A%22DeeplinkInterface.v1_0.DeeplinkClientInformation%22%2C%22deeplink%22%3A%22%2F${type}%2F${code}%22%7D`;
  try {
    const request = await axios
      .get<DeeplinkResponse>(
        `${SERVICE_URL}?deeplink=${deeplink}`,
        DEFAULT_OPTIONS
      )
      .then(res => res.data);
    const method = request.methods.find(
      it =>
        it.interface ===
        'TemplateListInterface.v1_0.CreateAndBindTemplateMethod'
    );

    let items: AmazonMusicInfoResultItem[] | undefined;

    switch (type) {
      case AmazonMusicUrlType.PLAYLIST:
        items = method?.template.widgets
          .find(
            it =>
              it.interface ===
              'Web.TemplatesInterface.v1_0.Touch.WidgetsInterface.VisualTableWidgetElement'
          )
          ?.items.map<AmazonMusicInfoResultItem>(it => ({
            name: it.primaryText as string,
            artist: it.secondaryText1 || '',
            duration: getDurationInSeconds(it.secondaryText3),
            artist_url: AMAZON_URL + it.secondaryText1Link.deeplink,
            url: AMAZON_URL + it.primaryLink.deeplink,
          }));
        break;
      case AmazonMusicUrlType.ALBUM:
        items = method?.template.widgets
          .find(
            it =>
              it.interface ===
              'Web.TemplatesInterface.v1_0.Touch.WidgetsInterface.DescriptiveTableWidgetElement'
          )
          ?.items.map<AmazonMusicInfoResultItem>(it => ({
            name: it.primaryText as string,
            artist: it.secondaryText2 || '',
            duration: getDurationInSeconds(it.secondaryText3),
            artist_url: AMAZON_URL + it.secondaryText2Link.deeplink,
            url: AMAZON_URL + it.primaryLink.deeplink,
          }));
        break;
      case AmazonMusicUrlType.ARTIST:
        items = method?.template.widgets
          .find(
            it =>
              it.interface ===
              'Web.TemplatesInterface.v1_0.Touch.WidgetsInterface.DescriptiveShowcaseWidgetElement'
          )
          ?.items.map<AmazonMusicInfoResultItem>(it => ({
            name: (it.primaryText as any).text,
            artist: it.secondaryText || method?.template.headerText.text as string,
            duration: null,
            artist_url: AMAZON_URL + it.secondaryLink.deeplink,
            url: AMAZON_URL + it.primaryLink.deeplink,
          }));
        break;
    }

    return {
      type,
      items: items || [],
      title: method?.template.headerText.text as string,
    };
  } catch (e) {}

  return null;
};

export const getPlaylistData = (code: string) =>
  requestData(code, AmazonMusicUrlType.PLAYLIST);
export const getArtistData = (code: string) =>
  requestData(code, AmazonMusicUrlType.ARTIST);
export const getAlbumData = (code: string) =>
  requestData(code, AmazonMusicUrlType.ALBUM);

export const getData = (url: string) => {
  if (isAmazonMusic(url)) {
    let codeType;
    if (isAmazonMusicPlaylist(url)) {
      codeType = AmazonMusicUrlType.PLAYLIST;
    } else if (isAmazonMusicArtist(url)) {
      codeType = AmazonMusicUrlType.ARTIST;
    } else if (isAmazonMusicAlbum(url)) {
      codeType = AmazonMusicUrlType.ALBUM;
    } else {
      throw new Error('Invalid URL');
    }

    const code = getAmazonMusicCode(url, codeType);

    if (code) {
      return requestData(code, codeType);
    }
  }
  throw new Error('Invalid URL');
};
