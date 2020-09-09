import UserProfileView from "./view/user-profile.js";
import FilmsFilterView from "./view/films-filter.js";
import FilmsTotalView from "./view/films-total.js";

import FilmsPresenter from "./presenter/films-section.js";

import {generateProfileUser} from "./mock/profile.js";
import {generateFilmsFilter} from "./mock/filter.js";
import {generateFilmsCard} from "./mock/card.js";

import {render} from "./utils/render.js";

const FILMS_COUNT = 20;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const profile = generateProfileUser();
const cards = new Array(FILMS_COUNT).fill().map(generateFilmsCard);
const filters = generateFilmsFilter(cards);

render(siteHeaderElement, new UserProfileView(profile));
render(siteMainElement, new FilmsFilterView(filters));

const filmsPresenter = new FilmsPresenter(siteMainElement);
filmsPresenter.init(cards);

render(siteFooterElement, new FilmsTotalView(cards));
