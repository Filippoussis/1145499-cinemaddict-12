import {createElement} from "../utils.js";

/**
 * создает шаблон обертки-контейнера
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createFilmsListContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class Container {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createFilmsListContainerTemplate();
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
