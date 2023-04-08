import { PixabayAPI } from './js/pixabay-api';
import { createGalleryCards } from './js/createGalleryCards';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const imagesInputEl = document.querySelector("#search-form")
const galleryListEl = document.querySelector(".gallery")
const loadMoreBtnEl = document.querySelector(".load-more")
const pixabayApi = new PixabayAPI();



const onSearchFormSubmit = async event => {
    event.preventDefault();

    const searchQuery = event.target.children.searchQuery.value.trim();
    if(!searchQuery){
        Notify.info('Write something')
        return;
    }
    pixabayApi.query = searchQuery;
    pixabayApi.page = 1;
    try {
      const { data } = await pixabayApi.fetchPhotos();
  
      if (!data.hits.length) {
        galleryListEl.innerHTML ='';
        loadMoreBtnEl.classList.add('is-hidden');
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
      }
      galleryListEl.innerHTML = data.hits.map((element) => createGalleryCards(element)).join("");
      loadMoreBtnEl.classList.remove('is-hidden');
    } catch (err) {
      console.log(err);
    }

};

const onLoadMoreBtnClick = async () => {
  pixabayApi.page += 1;

  try {
    const { data } = await pixabayApi.fetchPhotos();

    if (data.totalHits/pixabayApi.perPage === pixabayApi.page) {
    loadMoreBtnEl.classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.")
    }

    galleryListEl.insertAdjacentHTML(
      'beforeend',
      data.hits.map((element) => createGalleryCards(element)).join("")
    );

    if (data.hits.length < pixabayApi.perPage) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.")
    }

  } catch (err) {
    console.log(err);
  }
};

imagesInputEl.addEventListener('submit', onSearchFormSubmit)
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);