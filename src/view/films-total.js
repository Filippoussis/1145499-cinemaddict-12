import {createElement} from "../utils.js";

/**
 * создает шаблон блока с общим количеством фильмов
 * @param {Array} cards - массив объектов карточек фильмов
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createFilmsTotalTemplate = (cards) => {
  return (
    `<section class="footer__statistics">
      <p>${cards.length} movies inside</p>
    </section>`
  );
};

export default class FilmsTotal {
  constructor(cards) {
    this._cards = cards;
    this._element = null;
  }

  _getTemplate() {
    return createFilmsTotalTemplate(this._cards);
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
