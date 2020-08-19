import UserProfileView from "./view/user-profile.js";
import FilmsFilterView from "./view/films-filter.js";
import FilmsSortView from "./view/films-sort.js";
import AllFilmsView from "./view/films-main-section.js";
import MainFilmsView from "./view/films-main-list.js";
import FilmsContainerView from "./view/films-list-container.js";
import FilmCardView from "./view/film-card.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FilmsTotalView from "./view/films-total.js";
import FilmCardDetailsView from "./view/film-details.js";
import NoFilmsView from "./view/no-films.js";

import {generateProfileUser} from "./mock/profile.js";
import {generateFilmsFilter} from "./mock/filter.js";
import {generateFilmsCard} from "./mock/card.js";

import {renderElement, RenderPosition} from "./utils.js";

const FILMS_COUNT = 20;
const FILMS_COUNT_PER_STEP = 5;

const POPUP_TARGET_CLASS = [
  `film-card__title`,
  `film-card__poster`,
  `film-card__comments`,
];

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const profile = generateProfileUser();
const cards = new Array(FILMS_COUNT).fill().map(generateFilmsCard);
const filters = generateFilmsFilter(cards);

renderElement(siteHeaderElement, new UserProfileView(profile).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmsFilterView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmsSortView().getElement(), RenderPosition.BEFOREEND);

const allFilmsComponent = new AllFilmsView();
const mainFilmsComponent = new MainFilmsView();
const filmsContainerComponent = new FilmsContainerView();

renderElement(siteMainElement, allFilmsComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(allFilmsComponent.getElement(), mainFilmsComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(mainFilmsComponent.getElement(), filmsContainerComponent.getElement(), RenderPosition.BEFOREEND);

if (!cards.length) {
  renderElement(mainFilmsComponent.getElement(), new NoFilmsView().getElement(), RenderPosition.BEFOREEND);
}

const renderFilmCard = (cardListElement, card) => {
  const filmCardComponent = new FilmCardView(card);
  const filmCardDetailsComponent = new FilmCardDetailsView(card);

  const showPopup = () => {
    renderElement(cardListElement, filmCardDetailsComponent.getElement(), RenderPosition.BEFOREEND);
  };

  const closePopup = () => {
    filmCardDetailsComponent.getElement().remove();
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmCardComponent.getElement().addEventListener(`click`, (evt) => {
    if (POPUP_TARGET_CLASS.includes(evt.target.className)) {
      showPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  });

  filmCardDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    closePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(cardListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 0; i < Math.min(cards.length, FILMS_COUNT_PER_STEP); i++) {
  renderFilmCard(filmsContainerComponent.getElement(), cards[i]);
}

if (cards.length > FILMS_COUNT_PER_STEP) {
  let renderedCardsCount = FILMS_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();

  renderElement(mainFilmsComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardsCount, renderedCardsCount + FILMS_COUNT_PER_STEP)
      .forEach((card) => renderFilmCard(filmsContainerComponent.getElement(), card));

    renderedCardsCount += FILMS_COUNT_PER_STEP;

    if (renderedCardsCount >= cards.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

renderElement(siteFooterElement, new FilmsTotalView(cards).getElement(), RenderPosition.BEFOREEND);

// Показ блоков «Top rated» и «Most commented» — часть дополнительного задания. Оно выполняется по желанию.
// Выполню позднее
