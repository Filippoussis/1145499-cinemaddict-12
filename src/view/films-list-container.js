import AbstractView from "./abstract.js";

/**
 * создает шаблон обертки-контейнера
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createFilmsListContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class Container extends AbstractView {
  _getTemplate() {
    return createFilmsListContainerTemplate();
  }
}
