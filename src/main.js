import UserProfileView from "./view/user-profile.js";
import FilmsFilter from "./view/films-filter.js";
import FilmsSortView from "./view/films-sort.js";
import AllFilmsView from "./view/films-main-section.js";
import MainFilmsView from "./view/films-main-list.js";
import FilmsContainerView from "./view/films-list-container.js";
import FilmCard from "./view/film-card.js";
import ShowMoreButton from "./view/show-more-button.js";
import FilmsTotal from "./view/films-total.js";

import {generateProfileUser} from "./mock/profile.js";
import {generateFilmsFilter} from "./mock/filter.js";
import {generateFilmsCard} from "./mock/card.js";

import {renderElement, RenderPosition} from "./utils.js";

const FILMS_COUNT = 20;
const FILMS_COUNT_PER_STEP = 5;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const profile = generateProfileUser();
const cards = new Array(FILMS_COUNT).fill().map(generateFilmsCard);
const filters = generateFilmsFilter(cards);

renderElement(siteHeaderElement, new UserProfileView(profile).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmsFilter(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmsSortView().getElement(), RenderPosition.BEFOREEND);

const allFilmsComponent = new AllFilmsView();
const mainFilmsComponent = new MainFilmsView();
const filmsContainerComponent = new FilmsContainerView();

renderElement(siteMainElement, allFilmsComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(allFilmsComponent.getElement(), mainFilmsComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(mainFilmsComponent.getElement(), filmsContainerComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(cards.length, FILMS_COUNT_PER_STEP); i++) {
  renderElement(filmsContainerComponent.getElement(), new FilmCard(cards[i]).getElement(), RenderPosition.BEFOREEND);
}

if (cards.length > FILMS_COUNT_PER_STEP) {
  let renderedCardsCount = FILMS_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButton();

  renderElement(mainFilmsComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    cards.slice(renderedCardsCount, renderedCardsCount + FILMS_COUNT_PER_STEP).forEach((card) => renderElement(filmsContainerComponent.getElement(), new FilmCard(card).getElement(), RenderPosition.BEFOREEND));
    renderedCardsCount += FILMS_COUNT_PER_STEP;
    if (renderedCardsCount >= cards.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

renderElement(siteFooterElement, new FilmsTotal().getElement(), RenderPosition.BEFOREEND);

// Показ блоков «Top rated» и «Most commented» — часть дополнительного задания. Оно выполняется по желанию.
// Выполню позднее
