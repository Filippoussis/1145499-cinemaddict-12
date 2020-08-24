import AbstractView from "./abstract.js";

/**
 * создает шаблон меню фильтра
 * @param {object} filter - объект со значением полей фильтров
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createFilmsFilterTemplate = (filter) => {

  const {watchlist, watched, favorites} = filter;

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watched}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class FilmsFilter extends AbstractView {
  constructor(filter) {
    super();
    this._filter = filter;
  }

  _getTemplate() {
    return createFilmsFilterTemplate(this._filter);
  }
}
