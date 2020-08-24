import AbstractView from "./abstract.js";

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

export default class MainFilms extends AbstractView {
  _getTemplate() {
    return createFilmsMainListTemplate();
  }
}
