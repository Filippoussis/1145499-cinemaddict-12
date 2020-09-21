import AbstractView from "./abstract.js";

/**
 * создает шаблон карточки фильма
 * @param {object} card - объект с данными карточки
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createFilmCardTemplate = (card) => {
  const {name, poster, description, rating, year, genre, comments, isWatchlist, isWatched, isFavorite} = card;

  const isWatchlistActive = isWatchlist ? `film-card__controls-item--active` : ``;
  const isWatchedActive = isWatched ? `film-card__controls-item--active` : ``;
  const isFavoriteActive = isFavorite ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">54m</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="${name}" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlistActive}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatchedActive}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteActive}">Mark as favorite</button>
      </form>
    </article>`
  );
};

const POPUP_TARGET_CLASS = [
  `film-card__title`,
  `film-card__poster`,
  `film-card__comments`,
];

export default class FilmCard extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
    this._cardClickHandler = this._cardClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  _getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  _cardClickHandler(evt) {
    evt.preventDefault();
    if (POPUP_TARGET_CLASS.includes(evt.target.className)) {
      this._callback.cardClick();
    }
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setCardClickHandler(callback) {
    this._callback.cardClick = callback;
    this.getElement().addEventListener(`click`, this._cardClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
