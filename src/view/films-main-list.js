import {createElement} from "../utils.js";

/**
 * создает шаблон основного списка фильмов
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createFilmsMainListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
};

export default class MainFilms {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createFilmsMainListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
