import {createProfileTemplate} from "./view/profile.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createSectionFilmsTemplate} from "./view/main-content.js";
import {createSectionFilmsListTemplate} from "./view/all-movies.js";
import {createFilmCardTemplate} from "./view/card.js";
import {createShowMoreButtonTemplate} from "./view/button.js";
import {createRatedFilmsListTemplate} from "./view/top-rated.js";
import {createCommentedFilmsListTemplate} from "./view/most-commented.js";
import {createTotalNumberFilmsTemplate} from "./view/count.js";
import {generateFilmsCard} from "./mock/card.js";
import {generateFilmsFilter} from "./mock/filter.js";
import {generateProfileUser} from "./mock/profile.js";

const FILMS_COUNT = 20;
const FILMS_COUNT_PER_STEP = 5;

const cards = new Array(FILMS_COUNT).fill().map(generateFilmsCard);
const filters = generateFilmsFilter(cards);
const profile = generateProfileUser();

const siteMainElement = document.querySelector(`.main`);

/**
 * отрисовывает шаблон на странице
 * @param {HTMLElement} container - HTML-элемент на странице
 * @param {string} template - HTML-строка, которая будет вставлена именно «как HTML»
 * @param {string} place - специальное слово, указывающее, куда по отношению к container производить вставку
 */
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`.header`);
render(header, createProfileTemplate(profile), `beforeend`);

render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createSectionFilmsTemplate(), `beforeend`);

const mainSectionFilms = document.querySelector(`.films`);

render(mainSectionFilms, createSectionFilmsListTemplate(), `beforeend`);

const mainFilmsList = mainSectionFilms.querySelector(`.films-list`);
const mainFilmsListContainer = mainFilmsList.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(cards.length, FILMS_COUNT_PER_STEP); i++) {
  render(mainFilmsListContainer, createFilmCardTemplate(cards[i]), `beforeend`);
}

if (cards.length > FILMS_COUNT_PER_STEP) {
  let renderedCardsCount = FILMS_COUNT_PER_STEP;

  render(mainFilmsList, createShowMoreButtonTemplate(), `beforeend`);

  const showMoreButton = mainSectionFilms.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    cards.slice(renderedCardsCount, renderedCardsCount + FILMS_COUNT_PER_STEP).forEach((card) => render(mainFilmsListContainer, createFilmCardTemplate(card), `beforeend`));
    renderedCardsCount += FILMS_COUNT_PER_STEP;
    if (renderedCardsCount >= cards.length) {
      showMoreButton.remove();
    }
  });
}

render(mainSectionFilms, createRatedFilmsListTemplate(), `beforeend`);
render(mainSectionFilms, createCommentedFilmsListTemplate(), `beforeend`);

const extraFilmsList = mainSectionFilms.querySelectorAll(`.films-list--extra`);

extraFilmsList.forEach(function (elem) {
  const extraFilmsListContainer = elem.querySelector(`.films-list__container`);
  render(extraFilmsListContainer, createFilmCardTemplate(cards[0]), `beforeend`);
  render(extraFilmsListContainer, createFilmCardTemplate(cards[1]), `beforeend`);
});

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

render(footerStatistics, createTotalNumberFilmsTemplate(), `beforeend`);
