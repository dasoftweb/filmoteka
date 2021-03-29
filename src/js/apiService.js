import galleryTemplate from '../templates/gallery-card.hbs';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'be2bb7fd29eddf6e05cfa10ca2e7b19c';

export default class MovieApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  //Возвращаем популярные фильмы

  fetchPopularMovies() {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(response => response.results)
      .catch(error => console.log(error));
  }

  //Возвращаем поисковый запрос

  fetchSearchQuery() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&page=${this.page}&query=${this.searchQuery}`;

    return fetch(url)
      .then(response => response.json())
      .then(response => response.results)
      .catch(error => console.log(error));
  }

  //Возвращаем списока жанров

  fetchGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;

    return fetch(url)
      .then(response => response.json())
      .then(response => response.genres)
      .catch(error => console.log(error));
  }

  //Приводим к требованиям gallery

  normalizeMoviesList(rawdata) {
    rawdata
      .then(results => {
        //Затем делам запрос к жанрам
        return this.fetchGenres().then(genres => {
          return results.map(movie => ({
            ...movie,
            genres: movie.genre_ids
              //Для каждого id находим жанр
              .map(id => genres.filter(genre => genre.id === id))
              //Делаем один array
              .flat(),
            //Меняем дату
            release_date: movie.release_date.split('-')[0],
          }));
        });
      })
      .then(this.renderMovieCard);
  }

  //Отрисовываем фильмы

  renderMovieCard(results) {
    galleryRef.insertAdjacentHTML('beforeend', galleryTemplate(results));
  }

  getMovie(searchQuery) {
    this.searchQuery = searchQuery;
    return this.normalizeMoviesList(this.fetchSearchQuery(searchQuery));
  }

  getPopularMovies() {
    return this.normalizeMoviesList(this.fetchPopularMovies());
  }

  increamentPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

const movieApiServie = new MovieApiService();

const galleryRef = document.querySelector('.gallery-list');

//Вызов Search
movieApiServie.getMovie('deep');

//Вызов Popular
movieApiServie.getPopularMovies();
