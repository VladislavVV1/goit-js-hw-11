import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com';
  #API_KEY = '35175572-0d962d8c0f95ebedc007c0b09';

  page = 1;
  query = null;
  perPage = 12;

  fetchPhotos() {
    return axios.get(`${this.#BASE_URL}/api/`, {
      params: {
        q: this.query,
        page: this.page,
        per_page: this.perPage,
        image_type: 'photo',
        key: this.#API_KEY,
        orientation: 'horizontal',
        safesearch: true,
      },
    });
  }
}