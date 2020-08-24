import AbstractView from "./abstract.js";

/**
 * создает шаблон карточки фильма
 * @param {object} card - объект с данными карточки
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createFilmCardTemplate = (card) => {
  const {name, poster, description, rating, year, genre, comments} = card;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">54m</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
  }

  _getTemplate() {
    return createFilmCardTemplate(this._card);
  }
}
