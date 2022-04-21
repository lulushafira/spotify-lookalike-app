const getHost: () =>  string = () => {
  const protocol: string = window.location.protocol;
  const host: string = window.location.host;

  return `${protocol}//${host}`;
}

const config = {
  SPOTIFY_BASE_URL: 'https://api.spotify.com/v1',
  SPOTIFY_SCOPE: 'playlist-modify-private',
}

export default config;
