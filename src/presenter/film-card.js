import FilmCardView from "../view/film-card.js";
import FilmCardDetailsView from "../view/film-details.js";
import {render, remove, replace} from "../utils/render.js";

export default class FilmCard {
  constructor(filmsListContainer) {
    this._filmsListContainer = filmsListContainer;

    this._filmCardComponent = null;
    this._filmCardDetailsComponent = null;

    this._clickFilmCardHandler = this._clickFilmCardHandler.bind(this);
    this._clickCloseButtonHandler = this._clickCloseButtonHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(filmCard) {
    this._filmCard = filmCard;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmCardDetailsComponent = this._filmCardDetailsComponent;

    this._filmCardComponent = new FilmCardView(this._filmCard);
    this._filmCardDetailsComponent = new FilmCardDetailsView(this._filmCard);

    this._filmCardComponent.setClickHandler(this._clickFilmCardHandler);
    this._filmCardDetailsComponent.setClickHandler(this._clickCloseButtonHandler);

    if (prevFilmCardComponent === null || prevFilmCardDetailsComponent === null) {
      render(this._filmsListContainer, this._filmCardComponent);
      return;
    }

    if (this._filmsListContainer.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._filmsListContainer.getElement().contains(prevFilmCardDetailsComponent.getElement())) {
      replace(this._filmCardDetailsComponent, prevFilmCardDetailsComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmCardDetailsComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmCardDetailsComponent);
  }

  _showPopup() {
    render(this._filmsListContainer, this._filmCardDetailsComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _closePopup() {
    remove(this._filmCardDetailsComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _clickFilmCardHandler() {
    this._showPopup();
  }

  _clickCloseButtonHandler() {
    this._closePopup();
  }
}
