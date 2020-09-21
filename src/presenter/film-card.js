import FilmCardView from "../view/film-card.js";
import FilmCardDetailsView from "../view/film-details.js";
import {render, remove, replace} from "../utils/render.js";

export default class FilmCard {
  constructor(filmsListContainer, changeData) {
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;

    this._filmCardComponent = null;
    this._filmCardDetailsComponent = null;

    this._clickFilmCardHandler = this._clickFilmCardHandler.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);

    this._clickCloseButtonHandler = this._clickCloseButtonHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(filmCard) {
    this._filmCard = filmCard;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmCardDetailsComponent = this._filmCardDetailsComponent;

    this._filmCardComponent = new FilmCardView(this._filmCard);
    this._filmCardDetailsComponent = new FilmCardDetailsView(this._filmCard);

    this._filmCardComponent.setCardClickHandler(this._clickFilmCardHandler);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

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
    this._filmCardDetailsComponent.setCloseButtonClickHandler(this._clickCloseButtonHandler);
    this._filmCardDetailsComponent.setFormSubmitHandler(this._handleFormSubmit);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _closePopup() {
    remove(this._filmCardDetailsComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._filmCardDetailsComponent.reset(this._filmCard);
      this._closePopup();
    }
  }

  _clickFilmCardHandler() {
    this._showPopup();
  }

  _clickCloseButtonHandler() {
    this._filmCardDetailsComponent.reset(this._filmCard);
    this._closePopup();
  }

  _handleWatchlistClick() {
    this._changeData(Object.assign({}, this._filmCard, {
      isWatchlist: !this._filmCard.isWatchlist}
    ));
  }

  _handleWatchedClick() {
    this._changeData(Object.assign({}, this._filmCard, {
      isWatched: !this._filmCard.isWatched
    }));
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._filmCard, {
      isFavorite: !this._filmCard.isFavorite
    }));
  }

  _handleFormSubmit(formCard) {
    this._closePopup();
    this._changeData(formCard);
  }
}
