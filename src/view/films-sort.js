import AbstractView from "./abstract.js";

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

export default class FilmsSort extends AbstractView {
  _getTemplate() {
    return createFilmsSortTemplate();
  }
}
