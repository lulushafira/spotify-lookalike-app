import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import config from "./config";

type TSearchTrack = (
  query:string,
  accessToken:string
) => Promise<any>;

export const searchTrack: TSearchTrack = async (query, accessToken) => {
  const requestOptions: AxiosRequestConfig<any> = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  }; 

  const response:AxiosResponse = await axios.get(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${query}`, requestOptions);

  return response.data;
}//fetch spotify track data and called in search-bar component

type UserProfile = (accessToken:string) => Promise<any>

export const getUserProfile: UserProfile = async (accessToken) => {
  const requestOptions:AxiosRequestConfig = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };

  const response:AxiosResponse = await axios.get(`${config.SPOTIFY_BASE_URL}/me`, requestOptions);

  return response.data;
}//fetch user profile data and called in home

interface Playlist{
  name:string, description:string
} 

type TCreatePlaylist = (
  accessToken:string,
  userId:string,
  playlist: Playlist
) =>Promise<any>

export const createPlaylist:TCreatePlaylist = async (accessToken, userId, playlist) => {
  const data = JSON.stringify({
    name: playlist.name,
    description: playlist.description,
    public: false,
    collaborative: false,
  })
  
  const requestOptions:AxiosRequestConfig = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };

  const response:AxiosResponse = await axios.post(
    `${config.SPOTIFY_BASE_URL}/users/${userId}/playlists`,
    data,
    requestOptions
  );

  return response.data;
}

type AddTracks = (
  accessToken:string,
  playlistId:string,
  uris:string
) => Promise<any>

export const addTracksToPlaylist:AddTracks = async (accessToken, playlistId, uris) => {
  const data = JSON.stringify({
    uris
  });

  const requestOptions:AxiosRequestConfig = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };

  const response:AxiosResponse = await axios.post(
    `${config.SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`,
    data,
    requestOptions
  );

  return response.data;
}
