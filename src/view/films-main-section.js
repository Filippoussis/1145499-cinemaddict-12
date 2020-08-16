import {createElement} from "../utils.js";

/**
 * создает шаблон основного блока с контентом
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createFilmsMainSectionTemplate = () => {
  return (
    `<section class="films"></section`
  );
};

export default class Films {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createFilmsMainSectionTemplate();
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
