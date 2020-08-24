import AbstractView from "./abstract.js";

/**
 * создает шаблон кнопки "Show more"
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton extends AbstractView {
  _getTemplate() {
    return createShowMoreButtonTemplate();
  }
}
