import {createElement} from "../utils.js";

/**
 * создает шаблон блока с общим количеством фильмов
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createFilmsTotalTemplate = () => {
  return (
    `<section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>`
  );
};

export default class FilmsTotal {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createFilmsTotalTemplate();
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
