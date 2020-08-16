import {createElement} from "../utils.js";

/**
 * создает шаблон профайла пользователя
 * @param {object} profile - объект с данными пользователя
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createUserProfileTemplate = (profile) => {

  const {rank} = profile;

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfile {
  constructor(profile) {
    this._profile = profile;
    this._element = null;
  }

  _getTemplate() {
    return createUserProfileTemplate(this._profile);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
