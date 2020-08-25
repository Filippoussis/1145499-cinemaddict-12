import FilmsSortView from "../view/films-sort.js";
import FilmsMainSectionView from "../view/films-main-section.js";
import FilmsMainListView from "../view/films-main-list.js";
import FilmsContainerView from "../view/films-list-container.js";
import FilmCardView from "../view/film-card.js";
import FilmCardDetailsView from "../view/film-details.js";
import NoFilmsView from "../view/no-films.js";
import ShowMoreButtonView from "../view/show-more-button.js";

import {render, remove, RenderPosition} from "../utils/render.js";
import {sortFilmDate, sortFilmRating} from "../utils/card.js";

import {SortType} from "../const.js";

const FILMS_COUNT_PER_STEP = 5;

export default class SectionFilms {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;

    this._filmsSortComponent = new FilmsSortView();
    this._filmsSectionComponent = new FilmsMainSectionView();
    this._filmsListComponent = new FilmsMainListView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._noFilmsComponent = new NoFilmsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(sectionFilms) {
    this._sectionFilms = sectionFilms.slice();
    this._sourcedSectionFilms = sectionFilms.slice();

    render(this._filmsContainer, this._filmsSectionComponent);
    render(this._filmsSectionComponent, this._filmsListComponent);
    render(this._filmsListComponent, this._filmsContainerComponent);

    this._renderSection();
  }

  _sortCards(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._sectionFilms.sort(sortFilmDate);
        break;
      case SortType.RATING:
        this._sectionFilms.sort(sortFilmRating);
        break;
      default:
        this._sectionFilms = this._sourcedSectionFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortCards(sortType);
    this._clearTaskList();
    this._renderCardList();
  }

  _renderSort() {
    render(this._filmsSectionComponent, this._filmsSortComponent, RenderPosition.AFTERBEGIN);
    this._filmsSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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

  _clearTaskList() {
    this._filmsContainerComponent.getElement().innerHTML = ``;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
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

    this._renderSort();
    this._renderCardList();
  }
}
