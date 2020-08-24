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

import {render, remove} from "./utils/render.js";

const FILMS_COUNT = 20;
const FILMS_COUNT_PER_STEP = 5;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const profile = generateProfileUser();
const cards = new Array(FILMS_COUNT).fill().map(generateFilmsCard);
const filters = generateFilmsFilter(cards);

render(siteHeaderElement, new UserProfileView(profile));
render(siteMainElement, new FilmsFilterView(filters));
render(siteMainElement, new FilmsSortView());

const allFilmsComponent = new AllFilmsView();
const mainFilmsComponent = new MainFilmsView();
const filmsContainerComponent = new FilmsContainerView();

render(siteMainElement, allFilmsComponent);
render(allFilmsComponent, mainFilmsComponent);
render(mainFilmsComponent, filmsContainerComponent);

if (!cards.length) {
  render(mainFilmsComponent, new NoFilmsView());
}

const renderFilmCard = (cardListElement, card) => {
  const filmCardComponent = new FilmCardView(card);
  const filmCardDetailsComponent = new FilmCardDetailsView(card);

  const showPopup = () => {
    render(cardListElement, filmCardDetailsComponent);
  };

  const closePopup = () => {
    remove(filmCardDetailsComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmCardComponent.setClickHandler(() => {
    showPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmCardDetailsComponent.setClickHandler(() => {
    closePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(cardListElement, filmCardComponent);
};

for (let i = 0; i < Math.min(cards.length, FILMS_COUNT_PER_STEP); i++) {
  renderFilmCard(filmsContainerComponent.getElement(), cards[i]);
}

if (cards.length > FILMS_COUNT_PER_STEP) {
  let renderedCardsCount = FILMS_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();

  render(mainFilmsComponent, showMoreButtonComponent);

  showMoreButtonComponent.setClickHandler(() => {
    cards
      .slice(renderedCardsCount, renderedCardsCount + FILMS_COUNT_PER_STEP)
      .forEach((card) => renderFilmCard(filmsContainerComponent.getElement(), card));

    renderedCardsCount += FILMS_COUNT_PER_STEP;

    if (renderedCardsCount >= cards.length) {
      remove(showMoreButtonComponent);
    }
  });
}

render(siteFooterElement, new FilmsTotalView(cards));

// Показ блоков «Top rated» и «Most commented» — часть дополнительного задания. Оно выполняется по желанию.
// Выполню позднее
