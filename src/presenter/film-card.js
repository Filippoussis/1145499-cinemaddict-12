import FilmCardView from "../view/film-card.js";
import FilmCardDetailsView from "../view/film-details.js";
import {render, remove} from "../utils/render.js";

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

    this._filmCardComponent = new FilmCardView(this._filmCard);
    this._filmCardDetailsComponent = new FilmCardDetailsView(this._filmCard);

    this._filmCardComponent.setClickHandler(this._clickFilmCardHandler);
    this._filmCardDetailsComponent.setClickHandler(this._clickCloseButtonHandler);

    render(this._filmsListContainer, this._filmCardComponent);
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
