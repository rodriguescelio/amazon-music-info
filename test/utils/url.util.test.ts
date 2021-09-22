import { AmazonMusicUrlType } from '../../src/models/amazonMusicUrlType';
import {
  getAmazonMusicCode,
  isAmazonMusic,
  isAmazonMusicAlbum,
  isAmazonMusicArtist,
  isAmazonMusicPlaylist,
} from '../../src/utils/url.util';

describe('url.util', () => {
  it('check if url is from AmazonMusic', () => {
    expect(isAmazonMusic('https://music.amazon.com/')).toBe(true);
    expect(isAmazonMusic('https://facebook.com/')).toBe(false);
  });

  it('check if url is a AmazonMusic Playlist', () => {
    expect(
      isAmazonMusicPlaylist(
        'https://music.amazon.com.br/playlists/B08GM9SV6X?marketplaceId=ART4WZ8MWBX2Y&musicTerritory=BR'
      )
    ).toBe(true);

    expect(
      isAmazonMusicPlaylist('https://music.amazon.com.br/playlists/B08GM9SV6X')
    ).toBe(true);

    expect(
      isAmazonMusicPlaylist('https://music.amazon.com.br/albums/B07WGR89WP')
    ).toBe(false);

    expect(
      isAmazonMusicPlaylist('https://music.amazon.com.br/artists/B001EU961E')
    ).toBe(false);

    expect(isAmazonMusicPlaylist('https://music.amazon.com/')).toBe(false);
  });

  it('check if url is a AmazonMusic Album', () => {
    expect(
      isAmazonMusicAlbum(
        'https://music.amazon.com.br/albums/B07WGR89WP?marketplaceId=ART4WZ8MWBX2Y&musicTerritory=BR'
      )
    ).toBe(true);

    expect(
      isAmazonMusicAlbum('https://music.amazon.com.br/albums/B07WGR89WP')
    ).toBe(true);

    expect(
      isAmazonMusicAlbum('https://music.amazon.com.br/playlists/B08GM9SV6X')
    ).toBe(false);

    expect(
      isAmazonMusicAlbum('https://music.amazon.com.br/artists/B001EU961E')
    ).toBe(false);

    expect(isAmazonMusicAlbum('https://music.amazon.com/')).toBe(false);
  });

  it('check if url is a AmazonMusic Artist', () => {
    expect(
      isAmazonMusicArtist(
        'https://music.amazon.com.br/artists/B001EU961E/ti%25C3%25A3o-carreiro-e-pardinho?marketplaceId=ART4WZ8MWBX2Y&musicTerritory=BR'
      )
    ).toBe(true);

    expect(
      isAmazonMusicArtist(
        'https://music.amazon.com.br/artists/B001EU961E/ti%25C3%25A3o-carreiro-e-pardinho'
      )
    ).toBe(true);

    expect(
      isAmazonMusicArtist('https://music.amazon.com.br/albums/B07WGR89WP')
    ).toBe(false);

    expect(
      isAmazonMusicArtist('https://music.amazon.com.br/playlists/B08GM9SV6X')
    ).toBe(false);

    expect(isAmazonMusicArtist('https://music.amazon.com/')).toBe(false);
  });

  it('get AmazonMusic code from url', () => {
    expect(
      getAmazonMusicCode(
        'https://music.amazon.com.br/artists/B001EU961E/ti%25C3%25A3o-carreiro-e-pardinho?marketplaceId=ART4WZ8MWBX2Y&musicTerritory=BR',
        AmazonMusicUrlType.ARTIST
      )
    ).toBe('B001EU961E');

    expect(
      getAmazonMusicCode(
        'https://music.amazon.com.br/playlists/B08GM9SV6X?marketplaceId=ART4WZ8MWBX2Y&musicTerritory=BR',
        AmazonMusicUrlType.PLAYLIST
      )
    ).toBe('B08GM9SV6X');

    expect(
      getAmazonMusicCode(
        'https://music.amazon.com.br/albums/B07WGR89WP?marketplaceId=ART4WZ8MWBX2Y&musicTerritory=BR',
        AmazonMusicUrlType.ALBUM
      )
    ).toBe('B07WGR89WP');

    expect(
      getAmazonMusicCode(
        'https://music.amazon.com.br/artists/B001EU961E/ti%25C3%25A3o-carreiro-e-pardinho',
        AmazonMusicUrlType.ARTIST
      )
    ).toBe('B001EU961E');

    expect(
      getAmazonMusicCode(
        'https://music.amazon.com.br/playlists/B08GM9SV6X',
        AmazonMusicUrlType.PLAYLIST
      )
    ).toBe('B08GM9SV6X');

    expect(
      getAmazonMusicCode(
        'https://music.amazon.com.br/albums/B07WGR89WP',
        AmazonMusicUrlType.ALBUM
      )
    ).toBe('B07WGR89WP');
  });
});
