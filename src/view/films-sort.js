import {createElement} from "../utils.js";

/**
 * создает шаблон сортировки фильмов
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createFilmsSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class FilmsSort {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createFilmsSortTemplate();
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
