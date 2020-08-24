import AbstractView from "./abstract.js";

/**
 * создает шаблон основного блока с контентом
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createFilmsMainSectionTemplate = () => {
  return (
    `<section class="films"></section`
  );
};

export default class Films extends AbstractView {
  _getTemplate() {
    return createFilmsMainSectionTemplate();
  }
}
