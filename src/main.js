import { createProfileTemplate } from "./view/profile.js";
import { createFilterTemplate } from "./view/filter.js";
import { createSortTemplate } from "./view/sort.js";
import { createSectionFilmsTemplate } from "./view/main-content.js";
import { createSectionFilmsListTemplate } from "./view/all-movies.js";
import { createFilmCardTemplate } from "./view/card.js";
import { createShowMoreButtonTemplate } from "./view/button.js";
import { createRatedFilmsListTemplate } from "./view/top-rated.js";
import { createCommentedFilmsListTemplate } from "./view/most-commented.js";
import { createTotalNumberFilmsTemplate } from "./view/count.js";

const FILM_COUNT = 5;

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
render(header, createProfileTemplate(), `beforeend`);

render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createSectionFilmsTemplate(), `beforeend`);

const mainSectionFilms = document.querySelector(`.films`);

render(mainSectionFilms, createSectionFilmsListTemplate(), `beforeend`);

const mainFilmsList = mainSectionFilms.querySelector(`.films-list`);
const mainFilmsListContainer = mainFilmsList.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(mainFilmsListContainer, createFilmCardTemplate(), `beforeend`);
}

render(mainFilmsList, createShowMoreButtonTemplate(), `beforeend`);

render(mainSectionFilms, createRatedFilmsListTemplate(), `beforeend`);
render(mainSectionFilms, createCommentedFilmsListTemplate(), `beforeend`);

const extraFilmsList = mainSectionFilms.querySelectorAll(`.films-list--extra`);

extraFilmsList.forEach(function (elem) {
  const extraFilmsListContainer = elem.querySelector(`.films-list__container`);
  render(extraFilmsListContainer, createFilmCardTemplate(), `beforeend`);
  render(extraFilmsListContainer, createFilmCardTemplate(), `beforeend`);
});

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

render(footerStatistics, createTotalNumberFilmsTemplate(), `beforeend`);
