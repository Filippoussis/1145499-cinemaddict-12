import FilmsMainSectionView from "../view/films-main-section.js";
import FilmsMainListView from "../view/films-main-list.js";
import FilmsContainerView from "../view/films-list-container.js";
import FilmCardView from "../view/film-card.js";
import FilmCardDetailsView from "../view/film-details.js";
import NoFilmsView from "../view/no-films.js";
import ShowMoreButtonView from "../view/show-more-button.js";

import {render, remove} from "../utils/render.js";

const FILMS_COUNT_PER_STEP = 5;

export default class SectionFilms {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;

    this._filmsSectionComponent = new FilmsMainSectionView();
    this._filmsListComponent = new FilmsMainListView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._noFilmsComponent = new NoFilmsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(sectionFilms) {
    this._sectionFilms = sectionFilms.slice();

    render(this._filmsContainer, this._filmsSectionComponent);
    render(this._filmsSectionComponent, this._filmsListComponent);
    render(this._filmsListComponent, this._filmsContainerComponent);

    this._renderSection();
  }

  _renderCard(card) {
    const filmCardComponent = new FilmCardView(card);
    const filmCardDetailsComponent = new FilmCardDetailsView(card);

    const showPopup = () => {
      render(this._filmsContainerComponent, filmCardDetailsComponent);
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

    render(this._filmsContainerComponent, filmCardComponent);
  }

  _renderCards(from, to) {
    this._sectionFilms
      .slice(from, to)
      .forEach((sectionFilm) => this._renderCard(sectionFilm));
  }

  _renderNoCards() {
    render(this._filmsListComponent, this._noFilmsComponent);
  }

  _handleShowMoreButtonClick() {
    this._renderCards(this._renderedFilmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._sectionFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderCardList() {
    this._renderCards(0, Math.min(this._sectionFilms.length, FILMS_COUNT_PER_STEP));

    if (this._sectionFilms.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderSection() {
    if (!this._sectionFilms.length) {
      this._renderNoCards();
      return;
    }

    this._renderCardList();
  }
}
