'use strict';

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

/**
 * создает шаблон профайла пользователя
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

/**
 * создает шаблон меню фильтра
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createFilterTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

/**
 * создает шаблон меню сортировки
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

/**
 * создает шаблон основного блока с контентом
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createSectionFilmsTemplate = () => {
  return (
    `<section class="films"></section`
  );
};

/**
 * создает шаблон блока с основным списком фильмов
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createSectionFilmsListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

/**
 * создает шаблон карточки фильма
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createFilmCardTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">Sagebrush Trail</h3>
      <p class="film-card__rating">3.2</p>
      <p class="film-card__info">
        <span class="film-card__year">1933</span>
        <span class="film-card__duration">54m</span>
        <span class="film-card__genre">Western</span>
      </p>
      <img src="./images/posters/sagebrush-trail.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…</p>
      <a class="film-card__comments">89 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

/**
 * создает шаблон кнопки "Show more"
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

/**
 * создает шаблон блока со списком наиболее популярных фильмов
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createRatedFilmsListTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

/**
 * создает шаблон блока со списком наиболее коммментируемых фильмов
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createCommentedFilmsListTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

/**
 * создает шаблон блока с общим количеством фильмов
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createTotalNumberFilmsTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
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

extraFilmsList.forEach(elem => {
  const extraFilmsListContainer = elem.querySelector(`.films-list__container`);
  render(extraFilmsListContainer, createFilmCardTemplate(), `beforeend`);
  render(extraFilmsListContainer, createFilmCardTemplate(), `beforeend`);
});

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

render(footerStatistics, createTotalNumberFilmsTemplate(), `beforeend`);
