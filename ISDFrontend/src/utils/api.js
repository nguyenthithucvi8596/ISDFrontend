import axios from 'axios';
import { setAuthHeader, removeAuthHeader } from './common';
import { BASE_API_URL } from 'utils/config';

export const get = async (
  url,
  params,
  shouldSetAuthHeader = true,
  shouldRemoveAuthHeader = false,
) => {
  // if (shouldSetAuthHeader) {
  //   setAuthHeader();
  // }
  // if (shouldRemoveAuthHeader) {
  //   removeAuthHeader();
  // }

  return await axios.get(BASE_API_URL + '/' + url, params);
};

export const post = async (
  url,
  params,
  shouldSetAuthHeader = true,
  shouldRemoveAuthHeader = false,
) => {
  // if (shouldSetAuthHeader) {
  //   setAuthHeader();
  // }
  // if (shouldRemoveAuthHeader) {
  //   removeAuthHeader();
  // }
  return await axios.post(BASE_API_URL + '/' + url, params);
};


