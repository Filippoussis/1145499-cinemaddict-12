import {createElement} from "../utils.js";

/**
 * создает шаблон кнопки "Show more"
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createShowMoreButtonTemplate();
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
