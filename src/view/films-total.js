import AbstractView from "./abstract.js";

/**
 * создает шаблон блока с общим количеством фильмов
 * @param {Array} cards - массив объектов карточек фильмов
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createFilmsTotalTemplate = (cards) => {
  return (
    `<section class="footer__statistics">
      <p>${cards.length} movies inside</p>
    </section>`
  );
};

export default class FilmsTotal extends AbstractView {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  _getTemplate() {
    return createFilmsTotalTemplate(this._cards);
  }
}
